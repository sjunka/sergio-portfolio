---
title: Lo que una spec de TurboModule no te puede decir
date: 2026-08-11
summary: El codegen garantiza que las dos plataformas tengan los mismos tipos. No tiene nada que decir sobre permisos denegados, dobles taps o quién es dueño de un singleton del sistema, y ahí es donde las implementaciones se separan en silencio.
tags: react-native, módulos-nativos
---

Un módulo nativo tiene un trabajo engañosamente simple: exponer una capacidad de la plataforma a JavaScript una sola vez, y que se comporte igual en dos sistemas operativos que no coinciden en casi nada. El codegen de React Native hace gratis la primera mitad. La segunda mitad es donde está el trabajo, y ninguna herramienta la toca.

Escribí una librería pequeña que hace dos cosas: abrir el diálogo de confirmación del sistema y disparar una notificación local cuando se completa una meta de ahorro. Toda la superficie de TypeScript son dos firmas de método. Escribirla dos veces, una en Swift y otra en Kotlin, fue lo que me mostró cuánto del contrato nunca había quedado escrito.

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="Una spec de TypeScript generando dos implementaciones nativas, con una línea que marca dónde la spec deja de garantizar algo">
  <defs>
    <marker id="tm-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="tm-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="200" y="0" width="240" height="46" rx="8" class="dg-node-accent"/>
  <text x="320" y="21" text-anchor="middle" class="dg-t">Spec de TypeScript</text>
  <text x="320" y="37" text-anchor="middle" class="dg-s">nombres, aridad, tipos, forma de promesa</text>
  <path d="M320 50 V66" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="250" y="70" width="140" height="30" rx="15" class="dg-node"/>
  <text x="320" y="90" text-anchor="middle" class="dg-t">codegen</text>
  <path d="M320 104 V118 H130 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <path d="M320 104 V118 H510 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="30" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="130" y="162" text-anchor="middle" class="dg-t">Implementación Swift</text>
  <text x="130" y="179" text-anchor="middle" class="dg-s">UIAlertController, UNUserNC</text>
  <rect x="410" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="510" y="162" text-anchor="middle" class="dg-t">Implementación Kotlin</text>
  <text x="510" y="179" text-anchor="middle" class="dg-s">AlertDialog, NotificationManager</text>
  <path d="M0 216 H640" class="dg-flow-dashed"/>
  <text x="320" y="234" text-anchor="middle" class="dg-m">DEBAJO DE ESTA LÍNEA LA SPEC NO GARANTIZA NADA</text>
  <rect x="0" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="100" y="268" text-anchor="middle" class="dg-t">Semántica del rechazo</text>
  <text x="100" y="284" text-anchor="middle" class="dg-s">¿resolver o rechazar?</text>
  <rect x="220" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="268" text-anchor="middle" class="dg-t">Reentrada</text>
  <text x="320" y="284" text-anchor="middle" class="dg-s">¿qué hace un doble tap?</text>
  <rect x="440" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="540" y="268" text-anchor="middle" class="dg-t">Dueño del singleton</text>
  <text x="540" y="284" text-anchor="middle" class="dg-s">¿quién tiene el delegate?</text>
</svg>
<figcaption>El codegen impone todo lo que está arriba de la línea y nada de lo que está abajo. Las tres cajas de abajo son las que hacen que dos plataformas se comporten distinto mientras las dos siguen compilando.</figcaption>
</figure>

## Denegar no es un error

`notifyGoalCompleted(goalName): Promise<void>`. ¿Qué debería pasar cuando el usuario denegó el permiso de notificaciones?

El tipo no lo dice, y las dos respuestas son defendibles. Rechazar es honesto: el llamador pidió una notificación y no la obtuvo. Resolver también es honesto: el usuario ya tomó esa decisión, no es una condición excepcional, y el llamador no puede hacer nada con el rechazo salvo tragárselo.

Elegí resolver. La meta sigue cumplida; este canal simplemente se queda callado. Lo que importa más que la elección es que las dos plataformas tomen la misma, y eso resulta más difícil de lo que suena, porque no plantean la misma pregunta. iOS da un enum de estado de autorización con cinco casos, que se consulta antes de programar nada. Android 13 en adelante da un permiso en tiempo de ejecución que se pide a través de la activity, más un interruptor de notificaciones a nivel de app que no es un permiso y hay que revisar aparte.

Dos plataformas, tres formas distintas de que la respuesta sea no, un solo comportamiento que observa el llamador de JavaScript. Nada de eso es visible en `Promise<void>`.

## La promesa que nunca se resuelve

`showConfirmDialog(title, message): Promise<boolean>`. Los usuarios hacen doble tap. ¿Qué pasa con la segunda llamada mientras el primer diálogo sigue en pantalla?

En iOS, UIKit se niega a presentar un view controller encima de uno que ya está presentando, y se niega en silencio. Sin excepción, sin callback, sin nada. La segunda promesa simplemente nunca se asienta, y el llamador espera para siempre detrás de un spinner que no va a resolverse. En Android el segundo diálogo se apila sobre el primero, que no es un cuelgue pero tampoco es lo que nadie quería.

El arreglo es una guarda de reentrada en los dos lados que rechaza la segunda llamada con un error con nombre en vez de dejarla colgando. Poco código. El punto es que nada en el sistema de tipos, en el codegen ni en el compilador de ninguna de las dos plataformas me iba a hacer la pregunta jamás. Escribir la segunda implementación sí la hizo, porque no puedes portar un comportamiento que nunca articulaste.

## El singleton que estás tomando en silencio

Para mostrar una notificación con la app en primer plano en iOS, algo tiene que implementar el delegate del centro de notificaciones. Esa API acepta exactamente un delegate en todo el proceso.

Una librería que se registra como ese delegate desaloja en silencio al que la app anfitriona tuviera registrado, que para muchas apps es su manejo de push notifications. Funciona en la app de ejemplo y se rompe en producción, en un código cuyo dueño no tiene ninguna razón para sospechar de una librería de notificaciones de ahorro.

Así que la librería guarda una referencia débil al delegate anterior y le reenvía el callback de presentación cuando existe. Android no tiene un riesgo equivalente, porque su notification manager no es una API de un solo delegate. No hay nada que tomar ni nada que devolver.

Esa asimetría es la forma de casi todas. Las diferencias que sobrevivieron al código final viven en la plataforma, no en el contrato: Android necesita un request code por pedido de permiso para que un callback tardío no resuelva la promesa equivocada, y un id de notificación incremental para que dos metas cumplidas no se pisen en la bandeja. iOS no necesita ninguno de los dos.

## El resultado debería verse distinto

Este es el mismo mensaje, despachado por la misma llamada de JavaScript, en las dos plataformas:

<figure class="shots">
<img src="/blog/bolsillo-dialog-ios.png" alt="El diálogo de confirmación del sistema iOS sobre la app de ahorro" />
<img src="/blog/bolsillo-dialog-android.png" alt="El diálogo de confirmación del sistema Android sobre la misma pantalla" />
</figure>

Panel esmerilado con botones apilados en uno, hoja opaca con botones de texto alineados a la derecha en el otro. Distinto orden de botones, distinta tipografía, distinto todo.

Este es el resultado que quieres, y vale decirlo porque el instinto cuando eres dueño de las dos implementaciones es hacer que coincidan. El diálogo de confirmación de un usuario debería verse como el diálogo de confirmación de su sistema operativo. Lo que tiene que ser idéntico es el contrato: la misma pregunta, los mismos dos desenlaces, la misma promesa resolviendo al mismo booleano. El chrome debe ser nativo, y nativo significa distinto.

## La parte que hay que dejar escrita

El contrato de tipos se genera y se impone perfectamente. El contrato de comportamiento es prosa, nada lo impone, y es el único donde dos plataformas de verdad se separan.

Así que el README no es documentación de la librería, es parte de la librería. Denegar resuelve en lugar de rechazar, un segundo diálogo rechaza en lugar de colgarse, el delegate se toma prestado en lugar de quedárselo. Cada una de esas es una decisión que ningún compilador va a revisar y que un segundo implementador tomaría distinto.

Escríbelo antes de la segunda plataforma, no después. Yo lo hice después, y cada "espera, ¿qué hace iOS acá?" costó un viaje de vuelta a código que había escrito por intuición dos días antes.
