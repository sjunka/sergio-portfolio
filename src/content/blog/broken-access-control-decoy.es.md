---
title: La cookie era un señuelo, el bug era el control que faltaba
date: 2026-10-09
summary: En una app de práctica vulnerable a propósito, la cookie que pedía a gritos que la editaran no hizo nada, y el daño lo hicieron un archivo olvidado y un control de propiedad que faltaba.
tags: seguridad, arquitectura
---

Una cookie editable es una hipótesis sobre en qué confía el servidor. La evidencia es lo que hace el servidor cuando el valor cambia, y a veces la respuesta es nada.

Esa fue la respuesta que obtuve en mi curso de seguridad, en el reto 7 de los Hackademic Challenges de OWASP, un CMS vulnerable a propósito que mi docente asignó. La página pide el nombre de un estudiante y devuelve sus notas. También pone una cookie con un nombre burlón.

De los seis retos de mi informe, cinco cayeron con los mismos dos movimientos: leer lo que la página le entrega al navegador, o editar lo que el navegador envía de vuelta. Un conjunto así entrena un reflejo, y una cookie con nombre burlón lo dispara.

Para averiguarlo basta un diff: manda la petición, cambia un valor, mándala otra vez y compara. Cambiar la cookie no hizo nada. Esa línea sale de mis notas, y todo lo que digo de la app es comportamiento visto desde afuera, así que "el servidor la ignora" y "nada verifica" son inferencias, no código que leí.

## ¿Qué exigía realmente el servidor?

Importaron dos cosas, y ninguna era la cookie. Primero, un archivo de texto estaba en una carpeta que el servidor se negaba a listar. La carpeta respondía 403, pero el archivo de adentro le respondía a cualquiera que lo pidiera por su ruta, y registraba al último usuario que había iniciado sesión. Eso era un nombre válido.

Segundo, la página entregaba las notas privadas de ese estudiante a quien enviara el nombre. Nada comparaba a quien preguntaba con la persona por la que se preguntaba. Conocer un nombre funcionaba como permiso.

<figure>
<svg viewBox="0 0 640 132" role="img" aria-label="Un archivo olvidado entrega un nombre a un endpoint de notas sin control de quién pide. La cookie es un callejón sin salida punteado.">
  <defs>
    <marker id="bd-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="2" y="2" width="168" height="54" rx="8" class="dg-node"/>
  <text x="86" y="24" text-anchor="middle" class="dg-t">Un archivo olvidado</text>
  <text x="86" y="42" text-anchor="middle" class="dg-s">Carpeta 403, archivo servido</text>
  <path d="M172 29 H232" class="dg-flow-accent" marker-end="url(#bd-head)"/>
  <text x="203" y="22" text-anchor="middle" class="dg-m">UN NOMBRE</text>
  <rect x="236" y="2" width="168" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="24" text-anchor="middle" class="dg-t">Endpoint de notas</text>
  <text x="320" y="42" text-anchor="middle" class="dg-m">SIN CONTROL DE QUIÉN PIDE</text>
  <path d="M408 29 H466" class="dg-flow-accent" marker-end="url(#bd-head)"/>
  <rect x="470" y="2" width="168" height="54" rx="8" class="dg-node"/>
  <text x="554" y="33" text-anchor="middle" class="dg-t">Notas a quien pida</text>
  <path d="M320 86 V56" class="dg-flow-dashed"/>
  <text x="332" y="76" class="dg-m">EDÍTALA: NO CAMBIA NADA</text>
  <rect x="236" y="86" width="168" height="44" rx="8" class="dg-node"/>
  <text x="320" y="105" text-anchor="middle" class="dg-t">La cookie</text>
  <text x="320" y="120" text-anchor="middle" class="dg-m">UN SEÑUELO</text>
</svg>
<figcaption>La única regla que se aplicó, no listar, protegió la carpeta y no el archivo de adentro. Solo un control sobre quien pide cierra la brecha.</figcaption>
</figure>

El archivo me ahorró una búsqueda. Mi informe lista adivinar nombres con un diccionario como otra ruta, pero resolví el ejercicio por el archivo, así que esa ruta queda como hipótesis. Es exposición de información alimentando un control de acceso roto: la fuga puso el identificador y, sin control, el servidor lo aceptó.

## Autoriza en el servidor, con la identidad de la sesión

El fix es una decisión que el servidor toma en cada petición: ¿quién pregunta, y puede leer este registro? La respuesta sale de la sesión, nunca de un identificador que manda el cliente y nunca de la esperanza de que nadie conozca un nombre. Niega por defecto, así una ruta sin regla responde 403 en vez de 200.

```js
function canReadMarks(session, studentId) {
  if (!session) return false // deny by default
  return session.studentId === studentId // ownership comes from the session
}
```

La prueba que habría detectado esto es una sola petición: entra como un usuario, pide el registro de otro, espera un 403. Después saca el archivo del deploy. Un 403 en la carpeta no protege nada de lo que hay adentro, y poder llegar no es tener permiso, la misma división de [mi post sobre AWS](/blog/reachable-is-not-authorized). Cada ruta bajo la raíz web es superficie de ataque, porque el servidor va a servir lo que se te haya olvidado.

## La objeción: una cookie editable ya es un defecto de diseño

La objeción más fuerte es que una cookie que el usuario puede editar es un defecto de diseño por sí sola, haga lo que haga el servidor con ella. La mitad es cierta. Si el servidor hubiera leído la cookie para decidir algo, editarla habría sido el exploit. Otro reto del mismo conjunto es justo eso: un campo oculto de formulario con un sí o un no, que el servidor creía, y cambiarlo era todo el bug. Aquí la cookie no hizo nada, así que no había confianza que explotar. El valor del cliente en el que el servidor sí confió fue el campo más simple de la página, el nombre. La cookie parecía confianza y no lo era. El nombre parecía un dato de entrada cualquiera y funcionó como llave.

Las dos cosas pueden ser ciertas en una misma app: una cookie puede ser un mal olor mientras el hallazgo está en otro lado. Una cookie inerte igual vale la pena borrarla, porque quien mantenga el código después la va a leer como un control. Pero un mal olor solo te dice dónde mirar. Lo que el servidor exige te dice qué encontraste.

## Dónde leer más

[OWASP A01:2025 Broken Access Control](https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/) es el primero del Top 10 de OWASP 2025, y su lista de prevención cubre las dos mitades de este bug: negar por defecto y propiedad del registro por un lado, listado de directorios apagado y sin backups ni carpetas `.git` en la raíz web por el otro.
