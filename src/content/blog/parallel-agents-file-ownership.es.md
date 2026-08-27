---
title: Los agentes en paralelo no necesitan mejores prompts, necesitan dueños de archivos
date: 2026-08-19
summary: Tres agentes en tres ramas solo se mantienen fuera del camino del otro cuando cada archivo tiene exactamente un dueño y cada llamada entre ramas es una firma acordada antes de que se escriba cualquiera de los dos lados.
tags: proceso, arquitectura
---

Pon tres agentes de código sobre el mismo repositorio al mismo tiempo y el problema nunca es que uno haya escrito código malo. Es que dos escribieron código bueno en el mismo archivo, y el merge ahora es una decisión de criterio que ninguno de los dos está para tomar.

El instinto es arreglar esto insistiendo con el prompt. Decirle a cada agente en qué está trabajando, pedirle que se quede en su carril, recordarle que hay más gente. Eso no funciona, porque un carril no es un tema. Es un conjunto de rutas en disco. Una instrucción con forma de tema, del estilo "vos sos dueño del dashboard", deja ambiguo cada módulo compartido, y los módulos compartidos son justo donde ocurren las colisiones. El dashboard necesita saber si la generación está apagada. La ruta que genera, también. ¿Quién escribe `lib/settings.js`?

## Partí el trabajo por archivo, no por historia de usuario

Una descomposición de tareas generada desde una especificación sale con forma de historia por defecto. Una fase por rebanada de funcionalidad, cada rebanada tocando lo que necesite. Se lee precioso y no se puede mergear, porque una historia es un corte vertical: atraviesa la pantalla, la ruta, la librería y la base de datos, que es exactamente el conjunto de archivos que la historia siguiente también atraviesa. Dos verticales sobre el mismo stack siempre se encuentran en el medio.

Así que cortá horizontal. Cada fase declara dos listas, de qué es dueña y qué nunca toca, y ninguna ruta puede aparecer en dos listas de propiedad. Esa restricción es todo el mecanismo. El resto es papeleo.

<figure>
<svg viewBox="0 0 640 266" role="img" aria-label="Una fase base bloqueante que se abre en tres fases paralelas con propiedad de archivos disjunta, y luego una fase de merge">
  <defs>
    <marker id="fo-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="fo-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="170" y="0" width="300" height="48" rx="6" class="dg-node-accent"/>
  <text x="320" y="20" text-anchor="middle" class="dg-t">Fase 1, la base</text>
  <text x="320" y="37" text-anchor="middle" class="dg-s">dueña de todo lo que las demás no tocan, y las bloquea</text>
  <path d="M320 48 V68 H106 V90" class="dg-flow" marker-end="url(#fo-head)"/>
  <path d="M320 48 V90" class="dg-flow" marker-end="url(#fo-head)"/>
  <path d="M320 48 V68 H534 V90" class="dg-flow" marker-end="url(#fo-head)"/>
  <rect x="8" y="96" width="196" height="88" rx="6" class="dg-node"/>
  <text x="106" y="118" text-anchor="middle" class="dg-t">Fase 2, las pantallas</text>
  <text x="106" y="137" text-anchor="middle" class="dg-s">app/capture, app/result</text>
  <text x="106" y="151" text-anchor="middle" class="dg-s">components/capture, hooks/</text>
  <text x="106" y="165" text-anchor="middle" class="dg-s">proxy.js</text>
  <rect x="222" y="96" width="196" height="88" rx="6" class="dg-node"/>
  <text x="320" y="118" text-anchor="middle" class="dg-t">Fase 3, el backend</text>
  <text x="320" y="137" text-anchor="middle" class="dg-s">lib/db, lib/blob</text>
  <text x="320" y="151" text-anchor="middle" class="dg-s">lib/higgsfield</text>
  <text x="320" y="165" text-anchor="middle" class="dg-s">app/api/image, app/api/video</text>
  <rect x="436" y="96" width="196" height="88" rx="6" class="dg-node"/>
  <text x="534" y="118" text-anchor="middle" class="dg-t">Fase 4, el dashboard</text>
  <text x="534" y="137" text-anchor="middle" class="dg-s">lib/settings, lib/models</text>
  <text x="534" y="151" text-anchor="middle" class="dg-s">app/api/settings</text>
  <text x="534" y="165" text-anchor="middle" class="dg-s">app/dashboard</text>
  <path d="M106 184 V206 H320 V216" class="dg-flow-accent" marker-end="url(#fo-head-a)"/>
  <path d="M320 184 V216" class="dg-flow-accent" marker-end="url(#fo-head-a)"/>
  <path d="M534 184 V206 H320 V216" class="dg-flow-accent" marker-end="url(#fo-head-a)"/>
  <rect x="170" y="222" width="300" height="44" rx="6" class="dg-node-accent"/>
  <text x="320" y="242" text-anchor="middle" class="dg-t">Fase 5, el merge</text>
  <text x="320" y="258" text-anchor="middle" class="dg-s">los stubs chocan con el archivo real, y gana el real</text>
</svg>
<figcaption>Las tres fases del medio nunca se esperan entre sí porque ningún nombre de archivo de una caja aparece en otra. La Fase 1 es la única parte serializada del cronograma, y es corta a propósito.</figcaption>
</figure>

De este corte salieron treinta y nueve tickets repartidos en cinco fases, y tres de las fases corrieron al mismo tiempo en tres ramas. La ganancia de calendario es real pero es la mitad menor del beneficio. La mitad mayor es que un conflicto de merge pasa a ser una señal en vez de una tarea molesta: si dos ramas tocan el mismo archivo, alguien violó la tabla de propiedad, y eso es un problema de diseño por el que vale la pena frenar.

Hay un costo, y se paga por adelantado. Alguien tiene que sentarse con el diseño el tiempo suficiente para saber qué archivos existen antes de que exista ninguno, y una lista que resulta equivocada en la tercera semana sale cara de renegociar entre tres ramas. Es trabajo que una descomposición con forma de historia te deja postergar, y por eso las descomposiciones con forma de historia son populares.

## La parte que todos se saltan: fijá el contrato primero

La propiedad le dice a una fase qué puede escribir. No dice nada sobre qué puede llamar. La Fase 3 necesita `getSettings` de la Fase 4 desde el día uno, y la Fase 4 todavía no empezó.

Así que la firma se acuerda antes de que exista cualquiera de los dos lados, y se escribe donde ambos la vean:

```js
// lib/settings.js
export const getSettings = async () => ({ enabled: boolean, videoQuality: string })
export const assertEnabled = async () => void  // throws, .status = 503
export const isOwner = (userId) => boolean     // userId === process.env.OWNER_ID
```

Eso no es documentación. Es la interfaz contra la que construyen las dos ramas, una implementándola y la otra llamándola, y es la razón por la que se encuentran en el merge en vez de negociar durante el merge. Cada llamada entre fases del plan recibió una línea así antes de que se escribiera código. Las que me olvidé de fijar son las que produjeron discusiones después.

## Un mock no puede mockear un archivo que no existe

Acá está el detalle que me costó una tarde y que justifica el precio del enfoque entero.

La rama que consume escribe contra `lib/settings.js` y lo mockea en sus tests. Salvo que Vitest resuelve los imports de ES contra el sistema de archivos real antes de que `vi.mock` llegue a correr, así que mockear una ruta sin nada detrás falla en la resolución con un mensaje poco útil sobre un módulo que falta. El mock nunca tiene su oportunidad.

<figure>
<svg viewBox="0 0 640 145" role="img" aria-label="Un contrato fijado se convierte en un archivo stub en disco, que el merge reemplaza por la implementación real">
  <defs>
    <marker id="ct-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="8" y="10" class="dg-m">FIJADO ANTES DE ESCRIBIR CUALQUIER LADO</text>
  <rect x="8" y="20" width="180" height="64" rx="6" class="dg-node"/>
  <text x="98" y="43" text-anchor="middle" class="dg-t">El contrato</text>
  <text x="98" y="60" text-anchor="middle" class="dg-s">getSettings() devuelve</text>
  <text x="98" y="73" text-anchor="middle" class="dg-s">enabled y videoQuality</text>
  <path d="M188 52 H216" class="dg-flow" marker-end="url(#ct-head)"/>
  <rect x="230" y="20" width="180" height="64" rx="6" class="dg-node"/>
  <text x="320" y="43" text-anchor="middle" class="dg-t">Un stub en disco</text>
  <text x="320" y="60" text-anchor="middle" class="dg-s">un archivo, esa firma</text>
  <text x="320" y="73" text-anchor="middle" class="dg-s">// stub, la Fase 4 lo cambia</text>
  <path d="M410 52 H438" class="dg-flow" marker-end="url(#ct-head)"/>
  <rect x="452" y="20" width="180" height="64" rx="6" class="dg-node-accent"/>
  <text x="542" y="43" text-anchor="middle" class="dg-t">El merge</text>
  <text x="542" y="60" text-anchor="middle" class="dg-s">la colisión es esperada</text>
  <text x="542" y="73" text-anchor="middle" class="dg-s">y gana el archivo real</text>
  <path d="M320 84 V100" class="dg-flow-dashed" marker-end="url(#ct-head)"/>
  <rect x="230" y="106" width="180" height="38" rx="6" class="dg-node-warn"/>
  <text x="320" y="122" text-anchor="middle" class="dg-s">Vitest resuelve el import</text>
  <text x="320" y="136" text-anchor="middle" class="dg-s">antes de que corra vi.mock</text>
</svg>
<figcaption>El stub existe para que el módulo se pueda resolver, no para que se use. Todos los tests lo sobrescriben, y nada de la rama depende del cuerpo con el que se publica.</figcaption>
</figure>

Entonces "mockealo hasta que llegue la otra rama" significa escribir un archivo físico en esa ruta exacta, con la firma fijada y un comentario que diga qué fase lo reemplaza. Al merge se le avisa que espere esa colisión y se quede con la implementación. Suena quisquilloso hasta que notás que es la única forma de que una rama pueda correr su propia suite en su primer minuto en vez de en el último.

## Lo que esto no arregla

La propiedad evita que dos escritores toquen un archivo. No hace nada contra una fase que implementa el contrato distinto de como el contrato se lee, ni contra un contrato que ya estaba mal cuando se fijó. Eso sigue cayendo en el merge, a precio completo. Las tablas solo garantizan que cuando el merge sale mal, sale mal por un motivo que alguien puede nombrar.
