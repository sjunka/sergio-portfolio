---
title: Una pantalla web dentro de una app nativa es una frontera de confianza, no un componente
date: 2026-08-08
summary: Embeber una micro-app en un WebView te da un segundo runtime, un canal de entrada sin validar hacia tu estado global, y una carrera en el arranque. Este es el contrato que cierra los tres.
tags: react-native, arquitectura
---

Tarde o temprano un producto mobile tiene una pantalla que tiene que ser web. La tiene otro equipo, o sale con una cadencia semanal que las tiendas no pueden seguir, o el negocio quiere cambiarla sin publicar una versión. La respuesta habitual es un `WebView`, y el resultado habitual es una pantalla que funciona en el demo y se comporta raro en campo.

Construí una de estas hace poco: una app de ahorro donde el listado de metas es nativo y el detalle de la meta, incluido el formulario de abono, es una micro-app web estática dentro de un `WebView`. La ingeniería interesante no estaba en ninguno de los dos lados. Estaba en la costura.

<figure class="shots">
<img src="/blog/bolsillo-detail-ios.png" alt="La pantalla de detalle de meta renderizada por la micro-app web en iOS" />
<img src="/blog/bolsillo-detail-android.png" alt="La misma micro-app web renderizada en Android" />
</figure>

El mismo HTML en las dos plataformas, que es toda la razón por la que alguien acepta este trato. Lo que sigue es lo que cuesta.

## Tres problemas, y no son los que la gente espera

Los problemas no son de estilos ni de scroll. Son estos.

El `WebView` recarga cuando no se lo pediste, tirando a la basura una aplicación viva. La página y el lado nativo compiten en el arranque, y el que pierde se queda callado. Y cada mensaje que llega desde la página es entrada externa con una ruta directa hacia tu estado global.

Cada uno tiene un arreglo específico, y juntos forman un contrato que vale escribir antes de cualquier trabajo de features.

## La recarga que nadie pidió

Esta es la primera línea que todo el mundo escribe:

```tsx
<WebView source={{ html }} onMessage={handleMessage} />
```

Ese objeto literal es una referencia nueva en cada render del padre. `WebView` compara `source`, ve un cambio y recarga la página. Cada re-render de la pantalla destruye el DOM, la posición del scroll y todas las variables que la micro-app tenía, y reconstruye desde cero.

Subir el source a una constante de módulo lo arregla de forma permanente. Es la misma clase de error que pasar un objeto inline a un hijo memoizado, con un radio de daño mucho peor: un re-render desperdiciado cuesta un frame, una recarga desperdiciada cuesta el estado entero de una segunda aplicación.

## El handshake, y por qué nativo no debe hablar primero

Nativo tiene los datos y quiere enviarlos. La página tiene que estar escuchando cuando lleguen. No existe ningún evento que signifique "el JavaScript dentro de tu WebView terminó de montar sus listeners". `onLoadEnd` dispara cuando carga el documento, que se le parece lo suficiente como para funcionar en un dispositivo rápido y fallar en uno lento.

Así que la página habla primero. Monta sus listeners, después se anuncia, y nativo responde solo a ese anuncio.

<figure>
<svg viewBox="0 0 640 336" role="img" aria-label="Secuencia de mensajes entre el shell nativo y la micro-app web">
  <defs>
    <marker id="wv-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="wv-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="16" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="110" y="21" text-anchor="middle" class="dg-t">Shell nativo</text>
  <rect x="436" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="530" y="21" text-anchor="middle" class="dg-t">Micro-app web</text>
  <path d="M110 34 V330" class="dg-flow-dashed"/>
  <path d="M530 34 V330" class="dg-flow-dashed"/>
  <text x="520" y="60" text-anchor="end" class="dg-s">listeners montados en window y document</text>
  <text x="320" y="84" text-anchor="middle" class="dg-m">WEB_APP_READY</text>
  <path d="M524 92 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="320" y="118" text-anchor="middle" class="dg-m">SESSION_INITIALIZED &#123; goal &#125;</text>
  <path d="M116 126 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="144" class="dg-s">primer pintado</text>
  <text x="520" y="182" text-anchor="end" class="dg-s">el usuario envía un monto</text>
  <text x="320" y="206" text-anchor="middle" class="dg-m">DEPOSIT_CONFIRMED &#123; goalId, amount &#125;</text>
  <path d="M524 214 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <rect x="14" y="228" width="192" height="52" rx="6" class="dg-node-warn"/>
  <text x="110" y="248" text-anchor="middle" class="dg-t">parsear, validar, rechazar</text>
  <text x="110" y="263" text-anchor="middle" class="dg-s">después el caso de uso,</text>
  <text x="110" y="275" text-anchor="middle" class="dg-s">después el store</text>
  <text x="320" y="304" text-anchor="middle" class="dg-m">ACCUMULATED_AMOUNT_UPDATED &#123; accumulatedAmount &#125;</text>
  <path d="M116 312 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="330" class="dg-s">repinta en sitio</text>
</svg>
<figcaption>La página anuncia que está lista antes de que nativo envíe nada, así la carrera del arranque queda cerrada por construcción y no por temporización. Todo mensaje entrante pasa por la caja de validación antes de poder llegar al store.</figcaption>
</figure>

La carrera no se vuelve improbable. Se vuelve imposible, que es la única versión en la que confío, porque los bugs de temporización en una frontera de runtime se reproducen en uno de cada cinco dispositivos y nunca en el que tienes en el escritorio.

Un detalle de plataforma que conviene saber: `react-native-webview` entrega el mensaje de nativo a web en `document` en Android y en `window` en iOS. Registrar los dos es correcto en cualquier plataforma, y como el handler es idempotente, una entrega duplicada no hace daño.

## Trata a la página como un cliente que no escribiste

El canal de mensajes es toda la superficie de ataque, y es fácil olvidarlo porque la página también la escribiste tú. Escribiste *esta versión* de la página. Un `WebView` renderiza el HTML que se le dé, y en un dispositivo comprometido o con un release mal acotado ese HTML no es necesariamente el tuyo.

Así que hay exactamente un módulo que conoce el formato del cable, y nunca lanza excepciones. Un mensaje imposible de parsear o malformado resuelve a null y se descarta. Todo lo que está río abajo recibe un valor tipado o nada, lo que significa que ningún llamador necesita try/catch y ningún payload malformado llega jamás a Redux.

Esa única decisión es lo que permite que el resto de la app trate estos mensajes como eventos tipados normales. La frontera de confianza se aplica en un archivo en vez de ser responsabilidad de todos, que es la diferencia entre una regla y una esperanza.

## Actualizar sin remontar

La forma ingenua de reflejar un saldo nuevo en la página es re-renderizar la pantalla con datos nuevos, lo que recarga el `WebView`, lo que pierde todo. La forma correcta es tratar a la página como un cliente vivo y enviarle un mensaje.

Eso significa agregar un segundo tipo de mensaje de nativo a web en vez de una segunda fuente de verdad, y significa que el payload tiene que llevar el número que el dominio acaba de calcular. No el número que la pantalla puede derivar.

Ese último punto me costó un bug. La pantalla tenía un snapshot de la meta capturado al montar y calculaba el saldo nuevo sumándole el abono. Correcto en el primer abono de la sesión, incorrecto en todos los siguientes, porque el snapshot nunca se movía. El síntoma visible era la página mostrando 1.502.000 mientras el store tenía 1.503.000.

El arreglo tentador es hacer que el snapshot sea vivo. El arreglo real es que la capa de presentación no tenía por qué hacer aritmética de dominio. El caso de uso ya calcula el saldo nuevo a partir del estado actual; solo que no lo estaba devolviendo. Una vez que lo devolvió, la pantalla reenvía un número en lugar de derivarlo, y la aritmética duplicada desaparece.

## La regla que generaliza

Todo lo anterior es una sola regla con cuatro disfraces: cruzando una frontera de runtime, envía hechos, nunca derivaciones.

El `source` estable es un hecho sobre identidad. El handshake es un hecho sobre estar listo en lugar de una suposición. El parser validado es una negativa a derivar confianza a partir del origen. Y el mensaje del saldo lleva lo que el dominio calculó en vez de lo que la vista podría deducir.

Un `WebView` parece un componente en el árbol de JSX, que es exactamente por qué esto sigue agarrando desprevenida a la gente. Es una segunda aplicación con una cola de mensajes delante, y todo hábito que tiene sentido cruzando una frontera de red le aplica sin cambios.
