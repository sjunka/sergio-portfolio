---
title: MAPE-K, o cómo sacar la adaptación de tu lógica de negocio
date: 2026-08-04
summary: Un sistema autoadaptativo hace dos trabajos a la vez: el trabajo, y decidir cómo debe hacerse el trabajo. MAPE-K es el patrón que impide que esos dos se fusionen.
tags: ciberfísicos, arquitectura
---

El modo de falla es fácil de imaginar. El controlador de una bomba empieza como una función que lee un sensor y fija una velocidad. Después alguien agrega una regla para cuando el sensor viene ruidoso. Después un fallback para cuando la red se cae. Después un perfil más lento para horario nocturno, y una anulación para modo mantenimiento. Seis meses después, la función que controla la bomba es sobre todo una función que decide qué comportamiento de control usar, y nadie puede cambiar ninguno de los dos sin tocar el otro.

MAPE-K existe justamente para evitar eso. Propuesto por IBM en 2003 como el núcleo de la computación autonómica, sigue siendo la arquitectura de referencia para sistemas autoadaptativos, y la razón por la que sobrevivió no es su sofisticación. Es que traza una sola línea: la lógica que hace el trabajo y la lógica que adapta el trabajo son componentes separados, y se encuentran únicamente a través de un conocimiento compartido.

<figure>
<svg viewBox="0 -14 640 296" role="img" aria-label="El lazo MAPE-K leyendo y escribiendo un Conocimiento compartido, actuando sobre un sistema físico gestionado y validando planes contra un gemelo digital">
  <defs>
    <marker id="mk-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="mk-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="32" width="118" height="214" rx="8" class="dg-node"/>
  <text x="59" y="126" text-anchor="middle" class="dg-t">Conocimiento</text>
  <text x="59" y="144" text-anchor="middle" class="dg-s">modelos, objetivos,</text>
  <text x="59" y="158" text-anchor="middle" class="dg-s">historia</text>
  <rect x="142" y="8" width="250" height="262" rx="10" class="dg-plate"/>
  <text x="142" y="-3" class="dg-m">SISTEMA GESTOR</text>
  <rect x="162" y="32" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="52" class="dg-t">Monitor</text>
  <text x="178" y="67" class="dg-s">sensores, conectividad, carga</text>
  <rect x="162" y="90" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="110" class="dg-t">Análisis</text>
  <text x="178" y="125" class="dg-s">el estado contra los objetivos</text>
  <rect x="162" y="148" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="168" class="dg-t">Plan</text>
  <text x="178" y="183" class="dg-s">una estrategia, con plazo</text>
  <rect x="162" y="206" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="226" class="dg-t">Ejecución</text>
  <text x="178" y="241" class="dg-s">sin detener el sistema</text>
  <path d="M267 78 V86" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 136 V144" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 194 V202" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M120 54 H158" class="dg-flow-dashed"/>
  <path d="M120 112 H158" class="dg-flow-dashed"/>
  <path d="M120 170 H158" class="dg-flow-dashed"/>
  <path d="M120 228 H158" class="dg-flow-dashed"/>
  <text x="59" y="180" text-anchor="middle" class="dg-m">COMPARTIDO POR</text>
  <text x="59" y="192" text-anchor="middle" class="dg-m">LAS CUATRO</text>
  <rect x="430" y="32" width="210" height="86" rx="8" class="dg-node"/>
  <text x="446" y="60" class="dg-t">Sistema gestionado</text>
  <text x="446" y="78" class="dg-s">la bomba, el vehículo,</text>
  <text x="446" y="92" class="dg-s">la celda de producción. Nunca</text>
  <text x="446" y="106" class="dg-s">deja de hacer su trabajo.</text>
  <rect x="430" y="160" width="210" height="86" rx="8" class="dg-node-warn"/>
  <text x="446" y="188" class="dg-t">Gemelo digital</text>
  <text x="446" y="206" class="dg-s">una réplica ejecutable.</text>
  <text x="446" y="220" class="dg-s">El plan corre aquí antes</text>
  <text x="446" y="234" class="dg-s">de correr sobre el equipo.</text>
  <path d="M426 62 H404 V54 H378" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="398" y="40" text-anchor="middle" class="dg-m">LEE</text>
  <path d="M376 228 H414 V100 H426" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="420" y="140" class="dg-m">ACTÚA</text>
  <path d="M376 170 H396 V200 H426" class="dg-flow" marker-end="url(#mk-head)"/>
  <text x="382" y="196" class="dg-m">SIMULA</text>
</svg>
<figcaption>Cuatro etapas en orden, un Conocimiento que todas leen y escriben, y un sistema gestionado que nunca se detiene. El plan llega al gemelo antes de llegar al equipo.</figcaption>
</figure>

## Las cuatro etapas no son cuatro funciones

Escrito así, MAPE-K suena a un pipeline que cualquiera habría inventado: monitorear, analizar, planificar, ejecutar. Lo que hace que valga la pena nombrarlo es que cada etapa tiene una entrada distinta, una falla distinta y un dueño distinto en un equipo real.

Monitor recoge estado de ejecución del lado físico: temperatura, vibración, conectividad de red, carga de trabajo. Su falla es un muestreo demasiado lento o demasiado grueso para ver aquello a lo que te estás adaptando, y suele ser de quien sea dueño del hardware.

Análisis compara ese estado contra objetivos de calidad definidos, que es la etapa que la mayoría de los proyectos se salta y después lamenta. Disponibilidad, seguridad y rendimiento tienen que estar escritos como umbrales antes de que esta etapa pueda existir siquiera. Sin ellos, Análisis degenera en un montón de condicionales que codifican objetivos que nadie acordó.

Plan produce una estrategia concreta: reconfigurar un flujo industrial, recalcular una ruta, bajar a un modo degradado. En un entorno ciberfísico planifica bajo restricciones de tiempo duras, lo que descarta muchas técnicas de búsqueda que de otro modo serían atractivas.

Ejecución aplica el cambio sobre los actuadores mientras el sistema sigue operando. No al reiniciar, no en una ventana de mantenimiento. Esa restricción es lo que hace difícil a Ejecución, y es la razón de que la separación importe: el sistema gestionado tiene que estar construido de forma que su comportamiento se pueda cambiar por debajo.

Conocimiento es el modelo compartido que las cuatro leen y escriben. Objetivos, creencias actuales, historia de adaptaciones pasadas.

## El gemelo es el mecanismo de seguridad

En un sistema de software normal la etapa de Plan puede ser optimista, porque un mal plan se revierte. En uno ciberfísico un mal plan mueve varias toneladas de algo.

Por eso un gemelo digital suele colgar del Conocimiento en lugar de ser una iniciativa aparte. Una réplica ejecutable del sistema físico le permite al lazo simular la adaptación y comprobarla antes de que se acerque al equipo. Convierte un riesgo de ejecución no acotado en un costo de simulación acotado, que es la única versión de esto que se certifica.

El corolario es que el gemelo hay que mantenerlo como parte del lazo, no como una demo. Un gemelo que se desvía de la planta es peor que no tener gemelo, porque da una confianza que no se ganó.

## Un solo lazo es la excepción, no la regla

El dibujo de manual muestra un único lazo central, y los sistemas ciberfísicos en su mayoría no pueden tenerlo. La conectividad es intermitente, los presupuestos de latencia son ajustados, y un controlador que tiene que alcanzar un cerebro central para reaccionar es un controlador que falla cuando falla el enlace.

Así que MAPE-K descentralizado es la forma normal: varios lazos, cada uno local a un subsistema, coordinándose entre sí. Pueden compartir solo la etapa de Monitor, o compartir Conocimiento, o correr del todo independientes con contratos negociados en los bordes. Elegir qué patrón estás usando es una decisión arquitectónica que vale hacer explícita y dejar escrita, porque los patrones difieren en qué garantizan cuando se cae un enlace, y ese es exactamente el momento en que a alguien le va a importar.

## Dónde se cruza esto con la arquitectura de aplicaciones de siempre

La cuarta brecha con la que me sigo encontrando en este campo es que la regla de dominio queda soldada al protocolo del hardware. La lógica que dice que una bomba debe bajar la velocidad termina dentro del código que le habla Modbus a esa bomba específica.

MAPE-K no arregla eso por sí solo. La arquitectura hexagonal sí, y las dos componen bien: el lazo es lógica de dominio, los sensores y actuadores quedan detrás de puertos, y los adaptadores son el hardware que esté instalado hoy.

<figure>
<svg viewBox="0 0 640 168" role="img" aria-label="El lazo de adaptación hablando con un puerto, con tres adaptadores intercambiables detrás">
  <defs>
    <marker id="hx-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="56" width="150" height="56" rx="8" class="dg-node-accent"/>
  <text x="75" y="80" text-anchor="middle" class="dg-t">Lazo MAPE-K</text>
  <text x="75" y="96" text-anchor="middle" class="dg-s">lógica de dominio pura</text>
  <path d="M154 84 H206" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="210" y="46" width="120" height="76" rx="8" class="dg-plate"/>
  <text x="270" y="78" text-anchor="middle" class="dg-t">Puerto actuador</text>
  <text x="270" y="94" text-anchor="middle" class="dg-s">una interfaz</text>
  <path d="M334 84 H384" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="388" y="10" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="34" class="dg-t">Adaptador Modbus</text>
  <rect x="388" y="65" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="89" class="dg-t">Adaptador simulador</text>
  <rect x="388" y="120" width="200" height="38" rx="6" class="dg-node-warn"/>
  <text x="404" y="144" class="dg-t">Adaptador gemelo digital</text>
  <path d="M370 29 V139" class="dg-flow"/>
  <path d="M370 29 H382" class="dg-flow" marker-end="url(#hx-head)"/>
  <path d="M370 139 H382" class="dg-flow" marker-end="url(#hx-head)"/>
</svg>
<figcaption>El mismo lazo, tres destinos. Probar contra el simulador y validar contra el gemelo dejan de ser builds separados y pasan a ser un adaptador intercambiado.</figcaption>
</figure>

La ganancia no es elegancia. Es que "probar la lógica de adaptación" deja de requerir hardware, y "validar contra el gemelo antes de desplegar" deja de ser un paso manual que alguien recuerda. Ambos se vuelven la misma llamada contra otro adaptador, que es la única versión de esto que un equipo sigue haciendo después del tercer mes.
