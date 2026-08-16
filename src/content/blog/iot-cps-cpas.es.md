---
title: IoT mide, un CPS actúa, un CPAS reescribe cómo actúa
date: 2026-07-30
summary: Los tres se usan como sinónimos y no son el mismo sistema. La diferencia está en dónde termina el valor, y decide toda tu arquitectura.
tags: ciberfísicos, arquitectura
---

Pasé unas semanas investigando sistemas ciberfísicos adaptativos para una propuesta de metodología, y la hora más útil fue aquella en que el vocabulario dejó de ser una pila de sinónimos. Proveedores, papers y ofertas de trabajo usan IoT, CPS y CPAS como si fueran lo mismo con distintas cantidades de marketing. Describen tres arquitecturas con tres modos de falla distintos.

La distinción que se sostiene no es sobre sensores ni protocolos. Es sobre dónde termina el valor del sistema.

<figure>
<svg viewBox="0 0 640 258" role="img" aria-label="Tres carriles que comparan dónde termina el valor en sistemas IoT, CPS y CPAS">
  <defs>
    <marker id="ic-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ic-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <text x="0" y="40" class="dg-m">IOT</text>
  <rect x="76" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="41" text-anchor="middle" class="dg-t">Medir</text>
  <path d="M182 36 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="41" text-anchor="middle" class="dg-t">Transmitir</text>
  <path d="M310 36 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="41" text-anchor="middle" class="dg-t">Reportar</text>
  <text x="456" y="32" class="dg-s">El valor termina en el dato:</text>
  <text x="456" y="46" class="dg-s">un dashboard, una alerta.</text>
  <text x="0" y="116" class="dg-m">CPS</text>
  <rect x="76" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="117" text-anchor="middle" class="dg-t">Medir</text>
  <path d="M182 112 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="117" text-anchor="middle" class="dg-t">Decidir</text>
  <path d="M310 112 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="117" text-anchor="middle" class="dg-t">Actuar</text>
  <text x="456" y="108" class="dg-s">El valor termina en el mundo:</text>
  <text x="456" y="122" class="dg-s">una válvula se mueve.</text>
  <text x="0" y="196" class="dg-m">CPAS</text>
  <rect x="76" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="128" y="197" text-anchor="middle" class="dg-t">Medir</text>
  <path d="M182 192 H200" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="204" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="256" y="197" text-anchor="middle" class="dg-t">Decidir</text>
  <path d="M310 192 H328" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="332" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="384" y="197" text-anchor="middle" class="dg-t">Actuar</text>
  <path d="M384 211 V234 H256 V216" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <text x="320" y="250" text-anchor="middle" class="dg-m">EL PASO DECIDIR SE REESCRIBE SOLO EN RUNTIME</text>
  <text x="456" y="188" class="dg-s">El valor termina en un sistema</text>
  <text x="456" y="202" class="dg-s">que se cambió a sí mismo.</text>
</svg>
<figcaption>Las mismas tres cajas. Lo que cambia es si algo regresa, y si lo que regresa es un dato o una regla de decisión nueva.</figcaption>
</figure>

Un despliegue IoT mide, transmite y reporta. Su salida es telemetría, y un humano o una regla fija decide qué hacer con ella. Un sistema ciberfísico cierra el lazo: los sensores capturan temperatura o presión o movimiento, los algoritmos eligen una respuesta según objetivos y restricciones, los actuadores cambian el proceso físico, y el sistema mide el resultado para ajustarse en la siguiente pasada. Su salida es un movimiento.

Un sistema ciberfísico adaptativo agrega una condición más, y es la cara. La lógica de decisión misma cambia en tiempo de ejecución, sin recompilar y sin redesplegar. El sistema no está ejecutando una política que alguien publicó. Está ejecutando la política que tiene ahora, que puede no ser la que se instaló.

## Cada generación resolvió algo y dejó algo

Leer el campo en orden cronológico es más útil que leerlo por proveedor, porque cada etapa es una respuesta directa a lo que la anterior no podía hacer.

| Etapa | Enfoque dominante | Lo que dejó abierto |
| --- | --- | --- |
| Embebidos clásicos | Control determinista, firmware monolítico | Cerrado. No evoluciona. |
| IoT, década de 2010 | Conectividad y nube, telemetría | Conectar no es adaptar. Silos por fabricante. |
| CPS | Modelado conjunto de lo físico y lo computacional | Complejidad de integración |
| CPS autoadaptativos | Lazos de control de software, MAPE-K, computación autonómica | Difíciles de verificar y de garantizar |
| Frontera actual | Adaptación con aprendizaje, gemelos digitales, LLM en el lazo de decisión | Explicabilidad, seguridad, no determinismo |

Esa última fila es la que vale la pena mirar fijo. La capacidad ya está aquí. La adaptación guiada por aprendizaje funciona, se publica y está en producción en varias industrias. Lo que falta no es el mecanismo. Es alguna forma aceptada de verificar qué va a hacer, o de explicar qué acaba de hacer.

## Cuatro brechas, y solo una es un problema de investigación

En el trabajo actual faltan cuatro cosas de manera consistente, y vale separarlas porque no tienen el mismo tipo de respuesta.

Los ecosistemas comerciales son reactivos antes que adaptativos. Una casa inteligente que corre "si hay movimiento, entonces luz" está automatizando una regla que escribió un humano. Nada ahí aprende, y llamarlo adaptativo es un error de categoría que fija expectativas que ningún producto cumple.

Cuando el comportamiento sí cambia de verdad, el usuario no obtiene respuesta al porqué. Una adaptación sin explicación es indistinguible de un bug, y los usuarios la tratan como tal. Este es el problema de investigación de los cuatro, y no está cerca de resolverse.

Hay guías para diseñar CPS adaptativos y casi nada sobre cómo desarrollarlos de forma disciplinada. Abundan los papers que describen cómo debería verse la arquitectura. Muy pocos describen quién hace qué, en qué orden, con qué artefactos, y cómo sabes que una etapa terminó. Esa es una brecha de metodología, no de tecnología, lo que significa que se cierra decidiendo y no descubriendo.

Y la lógica de dominio termina soldada al protocolo del hardware. La regla que dice cuándo una bomba debe bajar la velocidad vive dentro del código que le habla Modbus a esa bomba. Cambias la bomba, reescribes la regla. Esta es la más ordinaria y la más arreglable: es el mismo problema de acoplamiento que los desarrolladores de aplicaciones resolvieron hace años con puertos y adaptadores, aplicado a una frontera que resulta ser física.

## Por qué la distinción no es académica

Si estás construyendo la versión IoT, tu riesgo es perder datos y tu pregunta más difícil es la gestión de flota.

Si estás construyendo la versión CPS, tu riesgo es que una decisión equivocada mueva algo pesado, y tu pregunta más difícil es la verificación de una política fija.

Si estás construyendo la versión CPAS, tu riesgo es que la política que verificaste no sea la que está corriendo ahora, y tu pregunta más difícil es cómo acotar en qué se le permite convertirse al sistema. Ese es otro trabajo. El assurance en tiempo de ejecución, los safe envelopes y los contratos que restringen la adaptación dejan de ser arquitectura elegante y pasan a ser lo que mantiene certificable al sistema.

Tres palabras, tres modelos de riesgo. Elegir el equivocado al principio significa que toda la estrategia de verificación apunta a un sistema que no estás construyendo.
