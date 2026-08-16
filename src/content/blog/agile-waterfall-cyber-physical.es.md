---
title: Ágil y cascada fallan los dos en sistemas ciberfísicos, por extremos opuestos
date: 2026-08-13
summary: Un método ignora la física. El otro no absorbe incertidumbre. Ninguna de las dos brechas se arregla ajustando ceremonias, y por eso la respuesta es otro modelo de procesos.
tags: ciberfísicos, proceso
---

Pregunta cómo debería un equipo construir un sistema donde el software controla equipo físico y adapta su propio comportamiento en tiempo de ejecución, y obtienes una de dos respuestas. Corre Scrum. O corre un V-model, por seguridad.

Las dos se dan de buena fe y las dos están equivocadas, de formas que resultan ser espejos exactos una de la otra. Entender por qué es lo que justifica proponer otro modelo de procesos en lugar de ajustar uno existente.

<figure>
<svg viewBox="0 0 640 214" role="img" aria-label="Métodos ágiles y rígidos acercándose desde extremos opuestos y quedándose cortos los dos frente a lo que necesita un sistema ciberfísico adaptativo">
  <defs>
    <marker id="gp-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="94" y="56" text-anchor="middle" class="dg-t">Ágil tradicional</text>
  <text x="94" y="72" text-anchor="middle" class="dg-s">Scrum, Kanban, XP</text>
  <path d="M192 59 H236" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="452" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="546" y="56" text-anchor="middle" class="dg-t">Rígido tradicional</text>
  <text x="546" y="72" text-anchor="middle" class="dg-s">Waterfall, V-model</text>
  <path d="M448 59 H404" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="244" y="14" width="152" height="90" rx="8" class="dg-plate"/>
  <text x="320" y="38" text-anchor="middle" class="dg-m">EL HUECO</text>
  <text x="320" y="58" text-anchor="middle" class="dg-s">física en tiempo real</text>
  <text x="320" y="74" text-anchor="middle" class="dg-s">adaptación en runtime</text>
  <text x="320" y="90" text-anchor="middle" class="dg-s">un safety case vivo</text>
  <text x="0" y="136" class="dg-t">Se detiene porque ignora lo físico</text>
  <text x="0" y="156" class="dg-s">Sin presupuestos de latencia, sin límites</text>
  <text x="0" y="170" class="dg-s">de actuador, sin evidencia de certificación.</text>
  <text x="0" y="184" class="dg-s">Flexible = el equipo cambia de opinión.</text>
  <text x="640" y="136" text-anchor="end" class="dg-t">Se detiene porque congela muy pronto</text>
  <text x="640" y="156" text-anchor="end" class="dg-s">La física se modela una vez y el documento</text>
  <text x="640" y="170" text-anchor="end" class="dg-s">envejece. El software espera al hardware.</text>
  <text x="640" y="184" text-anchor="end" class="dg-s">La variabilidad en runtime no se contempla.</text>
</svg>
<figcaption>Las dos flechas viajan hacia el mismo centro y ninguna llega. Ese centro es todo el espacio de problema de un sistema ciberfísico adaptativo.</figcaption>
</figure>

## Cinco dimensiones donde los dos métodos se separan

Puestas lado a lado, las fallas no son al azar. Cada método falla exactamente en la dimensión que el otro maneja, que es lo que hace tan tentador y tan poco útil el "combinémoslos".

| Dimensión crítica | Ágil tradicional | Rígido tradicional |
| --- | --- | --- |
| Tiempo real y física | No modela latencias ni límites físicos | Los modela, congelados en el documento inicial |
| Co-diseño hardware y software | Asume que el entorno ya existe | Secuencial: el software espera a la placa |
| Adaptación en ejecución | Flexibilidad es cambiar requisitos en la próxima reunión | No contempla variabilidad en runtime |
| Seguridad y certificación | Documentación mínima, el safety case no existe | Certificación como fase de cierre, tardía y cara |
| Coste del error | Barato, se revierte un deploy | Alto, y por eso el ciclo completo se vuelve lento |

La última fila explica las otras cuatro. La velocidad de ágil viene de que los errores son baratos: puedes publicar el martes y revertir el miércoles porque revertir cuesta un deploy. La cautela de cascada viene de que son caros. Pon al software a cargo de algo pesado y los errores vuelven a ser caros, así que la economía de ágil deja de sostenerse. Pero haz que ese software se adapte en tiempo de ejecución y la especificación no se puede congelar, así que la economía de cascada tampoco.

Terminas necesitando un método que sea barato de iterar y riguroso con el riesgo físico. Ninguna de las dos tradiciones ofrece ambas porque ninguna tuvo que hacerlo.

## Cuatro cosas que un método CPAS tiene que hacer distinto

La propuesta que terminé defendiendo no es una mezcla de las dos. Son cuatro compromisos, y cada uno contradice la práctica actual de una forma concreta.

**Simular primero, en lugar de escribir documentos que nadie ejecuta.** Los gemelos digitales y los modelos SysML permiten probar el código en un entorno virtual, software-in-the-loop, antes de que exista el hardware. El estado actual es uno de dos modos de falla: no hay documentación, o hay cientos de páginas de PDF que ningún pipeline corre nunca. Un modelo ejecutable es documentación que rompe un build cuando deja de ser cierta.

**Co-diseñar en paralelo, de verdad.** Mecatrónica, control y software avanzan a la vez contra simuladores validados, bajo latencias máximas acordadas. Hoy la descripción honesta de la mayoría de los proyectos es que nadie escribe código de control hasta que llega la placa, y después todo llega tarde al mismo tiempo.

**Poner la flexibilidad en el runtime, no en la reunión.** Este es el que separa un método CPAS de uno normal. El código nace diseñado para reconfigurarse solo cuando un sensor se degrada o el entorno cambia de forma impredecible. En la práctica actual, "somos flexibles" significa que el equipo puede cambiar de plan, que es una propiedad de la organización, no del sistema. Un sistema que necesita una reunión de planificación para adaptarse no es adaptativo.

**Gestionar el riesgo físico como métrica continua.** Las corridas de hardware-in-the-loop y el safety case se llevan de forma continua como parte de la madurez del sistema, no se producen como trámite de cierre. La alternativa es lo que todos hemos visto pasar: la certificación se descubre tarde, y el rediseño cuesta más que la feature.

## Por qué la respuesta tenía que ser un modelo de procesos

Me resistí a esta conclusión un buen rato, porque "la respuesta es una metodología nueva" suele oler mal.

Lo que me hizo cambiar de opinión es que los cuatro compromisos de arriba no son tecnología. Los gemelos digitales existen. La simulación en el lazo existe. La reconfiguración en tiempo de ejecución existe y está en producción. Los safety cases son una práctica madura con estándares detrás.

Lo que no existe es una respuesta aceptada a quién hace cuál de esas cosas, en qué orden, con qué artefactos, y cómo sabe un equipo que una etapa terminó. La literatura es generosa en guías para diseñar sistemas ciberfísicos adaptativos y casi muda sobre desarrollarlos. Esa no es una brecha de investigación que se cierre descubriendo algo. Es una brecha que se cierra decidiendo, dejándolo escrito, y siendo lo bastante concreto como para que un equipo lo pueda seguir un lunes.
