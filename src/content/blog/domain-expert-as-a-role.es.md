---
title: El caficultor es un Rol de nuestro proceso, no un stakeholder al que se consulta
date: 2026-08-30
summary: En un sistema de riego guiado por drones, quien sabe cuándo regar ejecuta Tareas y cierra puertas, porque una regla agronómica mal escrita es un defecto de especificación que ninguna suite de pruebas atrapa.
tags: ciberfísicos, proceso
---

Un dron sobrevuela una ladera de café. Un sensor lee la humedad del suelo. Una regla decide abrir una válvula en el lote siete durante once minutos. Todas las pruebas del pipeline pueden pasar y esa decisión puede seguir estando mal, porque nada en el pipeline sabe cuánta agua quiere una mata de café en una ladera en agosto.

El caficultor sí lo sabe. Lo normal es invitarlo a un review y anotar lo que diga. Nosotros lo metimos en el modelo de procesos, con Tareas propias.

Conviene decir qué existe: el sistema no está construido. Lo que existe es el modelo de procesos para construirlo, y este texto va sobre el modelo, que es lo que tiene que estar bien antes de que alguien compre una válvula.

## Qué significa ser un Rol

El Rol ejecuta cuatro Tareas, y de cada una sale un artefacto del que responde. En la Fase 1 captura y modela el conocimiento del dominio, y de ahí salen las reglas de negocio contra las que se escribe todo el bucle de control. En la Fase 3 valida esas reglas contra el prototipo. En la Fase 4 escribe el manual de operación y hace el review del incremento con el equipo.

![La Vista Detalle EPF de la Fase 3: seis Tareas, y el experto del dominio en negrita como quien ejecuta la validación de las reglas de negocio y las condiciones agronómicas](/blog/spem-fase-3.png)

La negrita en esa figura significa que el Rol ejecuta la Tarea y responde por lo que sale de ella. No es adorno. El gerente de proyecto asiste en la validación agronómica y no ejecuta nada de ella, que es lo honesto: de agronomía no sabe.

## Dos de las cuatro puertas te devuelven al principio

El modelo tiene cuatro puertas de decisión. Ninguna Fase avanza porque se le acabaron las semanas.

Dos fallan como esperarías: el incremento no pasa sus pruebas y vuelve a la Tarea que lo construyó, con el lazo corto. Las otras dos vuelven hasta la Fase 1, y una de esas es la del caficultor.

<figure>
<video src="/blog/spem-gates.es.mp4" poster="/blog/spem-gates.es.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>El camino del No es más largo que el trabajo que lo provocó, y dibujarlo así de largo es la decisión, no un accidente del layout.</figcaption>
</figure>

Cuando el caficultor mira el prototipo y dice que la regla está mal, el retorno no se queda en quien la programó. Vuelve a la Fase 1, al documento fundacional y a los contratos que salieron de él. Una regla que riega el lote equivocado a la hora equivocada se escribió mal antes de programarse mal, y reimplementarla más rápido produce el mismo sistema equivocado más pronto.

## El equipo de hardware tampoco es un área de apoyo

El mismo razonamiento tapa el otro hueco. Electrónica y mecatrónica tienen Tareas propias, banco propio y entregables propios: de un incremento sale la red de sensores instalada y el firmware, no solo código.

Los incrementos duran de dos a cuatro semanas, no dos. Es un plan y no una medición, porque todavía no ha corrido ninguno, pero la razón es concreta: calibrar un sensor en campo depende del clima, y el clima no cabe en un sprint.

## La objeción que yo mismo haría

Esto es un product owner con más ceremonia. Justo, y aquí está la diferencia. Un product owner prioriza el trabajo. Este Rol lo detiene, y el camino de vuelta desde su No es más largo que el de nadie, que es un costo que el modelo paga a propósito.

La objeción difícil es práctica. ¿De verdad un caficultor va a escribir un manual de operación y a sentarse en cinco reviews de incremento? Quizá no, y si no, el modelo te dijo algo cierto en vez de algo cómodo: el proyecto no tiene a nadie que responda por si el agua cae donde debe.

Todo modelo de procesos decide quién tiene permiso de decir que el sistema está mal. Casi todos se lo dan a quienes saben leer el código.
