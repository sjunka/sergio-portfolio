---
title: Qué busco cuando entrevisto a un ingeniero mobile
date: 2026-07-21
summary: Dejé de preguntar por el event loop. Estas cuatro preguntas me dicen más en diez minutos que un whiteboard en una hora.
tags: carrera, contratación
---

He estado en los dos lados de suficientes entrevistas mobile para saber que la mayoría mide práctica de entrevistas. Esto es lo que pregunto en su lugar, y lo que me dicen las respuestas.

## "Cuéntame el último bug que te tomó más de un día."

No el más difícil, el último. Las historias del bug más difícil vienen ensayadas. La última todavía está desordenada, y el desorden es la parte útil: cómo lo acotaron, qué descartaron y por qué, si fueron a buscar la causa raíz o se detuvieron en el síntoma que hizo desaparecer el ticket.

La respuesta que me gusta no tiene nada de glamorosa. Algo como "no lo podía reproducir en mi dispositivo, así que revisé qué tenían distinto los dispositivos de quienes lo reportaron". La respuesta que me preocupa es un fix sin diagnóstico.

## "Esta pantalla se re-renderiza con cada tecla que se escribe en otra parte de la app. ¿Dónde buscas?"

Un problema real con forma real. No busco una respuesta específica, busco si razonan sobre el árbol de componentes o si van directo a una herramienta. Ambas están bien. Poner `React.memo` en todos los componentes sin saber cuál se está re-renderizando no está bien, y es lo bastante común como para que la pregunta se gane su lugar.

## "¿Qué tuviste que entregar estando en desacuerdo?"

El trabajo senior pasa dentro de restricciones, y la mayoría no son técnicas. Quiero escuchar que expusieron su argumento, perdieron, lo entregaron bien de todas formas, y todavía pueden describir el tradeoff con precisión. Alguien que nunca estuvo en desacuerdo con una decisión no estuvo lo bastante cerca de una. Alguien que sigue molesto por una decisión de hace tres trabajos va a estar molesto con las mías.

## "¿Qué borrarías de tu app si nadie lo fuera a notar?"

Esto me dice si leen el código en el que trabajan o solo las partes que les asignaron. Quien sabe dónde están las abstracciones muertas ha estado prestando atención, y ese nivel de detalle es imposible de inventar.

## Lo que dejé de preguntar

Cualquier cosa con una respuesta correcta que yo podría buscar. Trivia del event loop, la diferencia entre dos métodos de ciclo de vida deprecados hace años, invertir una lista enlazada. Nada de eso predijo cómo trabajaba alguien después de entrar. Los candidatos que respondían bien ese material y los que trabajaban bien en el puesto eran conjuntos distintos de personas.

## La parte que no es una pregunta

Dales el código real por una hora, o algo con esa forma, y hagan pair en un cambio pequeño de verdad. Es la única parte del proceso que evalúa el trabajo. También es la única parte donde el candidato aprende algo cierto sobre trabajar contigo, que importa más de lo que la mayoría de los procesos admite.
