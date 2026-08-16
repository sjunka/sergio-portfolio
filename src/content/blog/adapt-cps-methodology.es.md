---
title: Un modelo de procesos donde el contrato existe antes que el código
date: 2026-08-15
summary: Seis fases para construir un sistema ciberfísico autoadaptativo, armadas sobre una idea estructural: el lazo de retroalimentación del equipo y el del sistema corren a velocidades muy distintas y no hay que confundirlos.
tags: ciberfísicos, proceso
---

Después de argumentar que ágil y cascada se pierden los dos lo que necesita un sistema ciberfísico adaptativo, le debía a la sala una respuesta concreta. Esta es: ADAPT-CPS, seis fases más un paso de preparación, pensada para proyectos multiequipo donde software, hardware y seguridad tienen que moverse a la vez.

Su forma sale de una sola observación. Un sistema autoadaptativo contiene dos lazos de retroalimentación con unos nueve órdenes de magnitud entre ellos, y casi todas las fallas de metodología que encontré venían de tratarlos como uno solo.

<figure>
<svg viewBox="0 0 640 400" role="img" aria-label="Seis fases con una iteración cero y dos caminos de retroalimentación que vuelven desde la operación adaptativa">
  <defs>
    <marker id="ph-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ph-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="0" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="20" class="dg-t">1 &#183; Especificación global de nivel cero</text>
  <text x="16" y="35" class="dg-s">reglas, atributos de calidad, mapa de contextos. Una vez.</text>
  <path d="M175 46 V56" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="58" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="78" class="dg-t">2 &#183; Descomposición en dominios</text>
  <text x="16" y="93" class="dg-s">un equipo por dominio, recursivo si el dominio es muy amplio</text>
  <path d="M175 104 V114" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="116" width="350" height="44" rx="8" class="dg-node-warn"/>
  <text x="16" y="136" class="dg-t">Iteración cero</text>
  <text x="16" y="151" class="dg-s">escenario más riesgoso, contratos concretos, CI en pie</text>
  <path d="M175 162 V172" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="174" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="194" class="dg-t">3 &#183; Esqueleto funcional mínimo</text>
  <text x="16" y="209" class="dg-s">el lazo de adaptación nace aquí, de punta a punta, mínimo</text>
  <path d="M175 220 V230" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="232" width="350" height="44" rx="8" class="dg-node-accent"/>
  <text x="16" y="252" class="dg-t">4 &#183; Crecimiento incremental multiequipo</text>
  <text x="16" y="267" class="dg-s">en paralelo, contra el contrato, sobre simuladores</text>
  <path d="M175 278 V288" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="290" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="310" class="dg-t">5 &#183; Verificación, integración, despliegue</text>
  <text x="16" y="325" class="dg-s">pruebas de contrato, luego el gemelo, luego el equipo</text>
  <path d="M175 336 V346" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="348" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="368" class="dg-t">6 &#183; Operación adaptativa</text>
  <text x="16" y="383" class="dg-s">el lazo corre de forma continua y autónoma</text>
  <path d="M350 370 H420 V254 H358" class="dg-flow-accent" marker-end="url(#ph-head-a)"/>
  <text x="432" y="290" class="dg-m">CADA CICLO</text>
  <text x="432" y="306" class="dg-s">lo que el sistema aprende</text>
  <text x="432" y="319" class="dg-s">en operación alimenta el</text>
  <text x="432" y="332" class="dg-s">siguiente incremento.</text>
  <path d="M350 370 H570 V22 H358" class="dg-flow-dashed" marker-end="url(#ph-head)"/>
  <text x="432" y="52" class="dg-m">RARO</text>
  <text x="432" y="68" class="dg-s">solo cuando una regla de</text>
  <text x="432" y="81" class="dg-s">nivel cero deja de valer.</text>
  <text x="432" y="94" class="dg-s">Es un cambio de línea base</text>
  <text x="432" y="107" class="dg-s">y exige revisión formal de</text>
  <text x="432" y="120" class="dg-s">cada dominio afectado.</text>
</svg>
<figcaption>El camino de vuelta sólido es el normal y es corto. El punteado llega hasta el acuerdo fundacional, y hacerlo caro a propósito es lo que mantiene a ese acuerdo valiendo la pena.</figcaption>
</figure>

## El acuerdo fundacional se hace una sola vez

La fase 1 pone a los responsables de todos los dominios en una sala para definir, de forma colaborativa y una sola vez, tres cosas: las reglas de negocio, los atributos de calidad del sistema completo, y el mapa de contextos con los contratos de integración entre dominios.

La palabra que hace el trabajo ahí es *una*. Este nivel está pensado para permanecer estable durante todo el desarrollo normal. Si se mueve cada trimestre nunca fue una línea base, fue un backlog, y todos los equipos río abajo estuvieron construyendo sobre arena.

La fase 2 convierte el mapa de contextos en un organigrama. Cada dominio funcional recibe un equipo responsable, y cuando un dominio resulta demasiado amplio se repite el mismo patrón dentro de él: subdominios con su propio contrato interno, siempre subordinado al global. Aquí se responden dos preguntas y en ningún otro lado. Cuáles son las piezas, y cómo se relacionan.

## La iteración cero existe porque tres decisiones bloquean todo lo demás

Antes de empezar a construir se deciden tres cosas, y saltarse cada una es una causa común de proyecto estancado.

Qué escenario construir primero. El criterio no es valor de negocio, es reducción temprana de incertidumbre: elige el escenario que sea a la vez el más simple y el más riesgoso. El que más te va a enseñar sobre si la arquitectura sobrevive al contacto con el mundo físico.

Los contratos bajan de concepto a realidad. El mapa de contextos de la fase 1 dice que dos dominios intercambian un setpoint comandado. La iteración cero dice exactamente qué esquema, qué formato, qué protocolo, qué unidades. Hasta que eso pasa, "acordamos el contrato" es una sensación compartida y no algo contra lo que dos equipos puedan construir.

Y se levanta la infraestructura compartida: repositorios, entornos de prueba, el primer canal de integración continua. No porque el tooling sea emocionante, sino porque un equipo de la fase 4 que tenga que inventar su propio pipeline va a inventar uno distinto, y la integración lo va a pagar después.

## El lazo nace en la fase 3, y nace completo

La fase 3 es la fase más pequeña que es interesante. Cada equipo construye su porción real más chica del escenario elegido, con componentes reales o con simuladores temporales.

Lo que la hace una fase y no un hito es lo que aparece al final: un ciclo completo de monitorear, analizar, planificar y ejecutar, corriendo de punta a punta, por mínimo que sea. No existe una versión anterior de ese lazo. Aquí es donde empieza a existir.

Ese orden importa. Un lazo ensamblado al final a partir de cuatro etapas construidas por separado tiende a descubrir, muy tarde, que la frecuencia de muestreo del monitor no alcanza para la ventana de decisión del plan. Construirlo delgado y completo primero convierte eso en un problema de la fase 3 en vez de una catástrofe de la fase 5.

## La fase 4 es donde el contrato se gana el sueldo

Cada equipo hace crecer su parte en paralelo, conservando su propia forma de trabajo interna, y eso es deliberado: a un grupo de mecatrónica y a uno de software embebido no hay que obligarlos a la misma ceremonia.

El mecanismo que les permite moverse sin bloquearse mutuamente es el contrato definido antes de que nadie escribiera código. Cada lado construye contra la interfaz y usa simuladores hasta que ambos estén listos para integrarse con el componente físico real. La coordinación entre equipos ocurre en encuentros periódicos de sincronización y no de forma continua, porque la coordinación continua entre seis equipos es solo una reunión.

La fase 5 es la compuerta automatizada: integrar el trabajo de todos, correr las pruebas de conformidad de contrato, validar el lazo enriquecido contra el gemelo digital cuando existe, y solo entonces desplegar al entorno físico. El gemelo no es un extra en esa frase. Es el paso que convierte desplegar sobre equipo real en una decisión y no en una apuesta.

## Dos relojes, y la razón para mantenerlos separados

La fase 6 es el sistema operando y adaptándose solo. Y aquí está el punto estructural de todo el modelo.

<figure>
<svg viewBox="0 0 640 160" role="img" aria-label="Dos líneas de tiempo a frecuencias muy distintas: los incrementos del equipo y la adaptación del sistema en tiempo de ejecución">
  <defs>
    <marker id="cl-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="0" y="30" class="dg-m">RELOJ DEL EQUIPO</text>
  <path d="M0 52 H628" class="dg-flow" marker-end="url(#cl-head)"/>
  <path d="M0 44 V60 M156 44 V60 M312 44 V60 M468 44 V60 M624 44 V60" class="dg-flow"/>
  <text x="78" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="234" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="390" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="546" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="0" y="76" class="dg-s">cierra contra el simulador &#183; CI en cada commit &#183; hardware-in-the-loop cada dos incrementos</text>
  <text x="0" y="112" class="dg-m">RELOJ DEL SISTEMA</text>
  <path d="M0 130 H628" class="dg-flow-accent" marker-end="url(#cl-head)"/>
  <path d="M0 124 V136 M12 124 V136 M24 124 V136 M36 124 V136 M48 124 V136 M60 124 V136 M72 124 V136 M84 124 V136 M96 124 V136 M108 124 V136 M120 124 V136 M132 124 V136 M144 124 V136 M156 124 V136 M168 124 V136 M180 124 V136 M192 124 V136 M204 124 V136 M216 124 V136 M228 124 V136 M240 124 V136 M252 124 V136 M264 124 V136 M276 124 V136 M288 124 V136 M300 124 V136 M312 124 V136 M324 124 V136 M336 124 V136 M348 124 V136 M360 124 V136 M372 124 V136 M384 124 V136 M396 124 V136 M408 124 V136 M420 124 V136 M432 124 V136 M444 124 V136 M456 124 V136 M468 124 V136 M480 124 V136 M492 124 V136 M504 124 V136 M516 124 V136 M528 124 V136 M540 124 V136 M552 124 V136 M564 124 V136 M576 124 V136 M588 124 V136 M600 124 V136 M612 124 V136 M624 124 V136" class="dg-flow-accent"/>
  <text x="0" y="152" class="dg-s">el lazo adaptándose en milisegundos, de forma continua, sin nadie en la sala</text>
</svg>
<figcaption>No es una metáfora. Estas son las dos velocidades a las que cambia el sistema, y el mismo dibujo a escala real pondría unos mil millones de marcas en la línea de abajo por cada marca de la de arriba.</figcaption>
</figure>

Confundirlos es el error clásico, y va en las dos direcciones. Los equipos prometen adaptación en tiempo de ejecución y entregan una cadencia de sprint, así que el sistema espera a que un humano note el problema. O tratan cada adaptación en ejecución como retroalimentación a la que el backlog debe responder, y se ahogan.

Mantenerlos separados es lo que codifica la última fase. Lo aprendido en la fase 6 alimenta la fase 4, el siguiente incremento de crecimiento: normal, frecuente, barato. Solo en el caso excepcional en que una regla de nivel cero dejó de ser cierta esa retroalimentación llega a la fase 1, y entonces es explícitamente un cambio de línea base que exige revisión formal de los responsables de cada dominio afectado.

Dos caminos de vuelta, con costos deliberadamente distintos. Esa es la parte que defendería con más fuerza si solo sobreviviera una idea: el acuerdo fundacional solo vale la pena si volver a él es caro, y el lazo de crecimiento solo vale la pena si volver a él no lo es.
