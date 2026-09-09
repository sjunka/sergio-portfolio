---
title: Un diagrama de proceso es una Vista de un modelo, no un dibujo
date: 2026-08-27
summary: Veinticinco figuras para un solo modelo de procesos, y el cambio de nombre de un Rol que decidió cómo había que producirlas todas.
tags: proceso, arquitectura
---

Un documento de modelo de procesos necesitaba veinticinco figuras: cinco Fases, cinco Vistas de cada Fase, en notación SPEM 2.0. Dibujé las tres primeras a mano. Después le cambiaron el nombre a un Rol, y me pasé veinte minutos persiguiendo ese nombre por tres archivos. Aun así publiqué una figura con la etiqueta vieja.

Ahí está todo el argumento. Un diagrama no es un dibujo que se mantiene. Es una consulta sobre un modelo, y el modelo es lo único que vale la pena editar.

## Una Fase, cinco preguntas

El instinto es dibujar la figura grande, la que lo tiene todo. Ya la hice. Es una tabla de consulta sin índice.

Cada Fase produce en cambio cinco figuras, y cada una responde exactamente una pregunta. Resumen: qué es esta Fase. Flujo: qué consume y qué produce cada Tarea. Roles: quién la ejecuta y quién asiste. Descomposición: de qué se compone. Detalle EPF: cómo lo dibujaría el Eclipse Process Framework, con los Roles a la izquierda, las Tareas en el centro y los Productos de Trabajo a la derecha.

![La Vista Detalle EPF de la Fase 1: tres Roles a la izquierda, tres Tareas encadenadas al centro y los documentos que salen de cada una a la derecha](/blog/spem-fase-1.png)

Cinco dibujos que se solapan mucho y no se contradicen en nada, porque son cinco lecturas del mismo dato.

## La prueba del cambio de nombre

A cualquier forma de hacer diagramas hay que preguntarle una sola cosa: cuánto cuesta renombrar un Rol que aparece once veces en cinco figuras.

Dibujar a mano cuesta once ediciones y, peor, falla en silencio. Si se te escapa una, la figura queda mal y nadie te avisa, porque ninguna herramienta sabe que esas once cajas eran la misma cosa.

<figure>
<video src="/blog/spem-views.es.mp4" poster="/blog/spem-views.es.jpg" controls muted loop playsinline preload="metadata"></video>
<figcaption>El cambio es un campo. Lo que se redibuja es cada figura que menciona el Rol, y eso es lo que ninguna herramienta de dibujo te puede ofrecer.</figcaption>
</figure>

El modelo son datos aburridos, que es justo el punto:

```ts
const fase = {
  nombre: 'Descomposición en dominios',
  roles: ['Gerente de proyecto', 'Ingeniero de mecatrónica'],
  tareas: [{
    nombre: 'Configurar los entornos SIL y HIL',
    roles: [{ rol: 'Ingeniero de mecatrónica', papel: 'perform' }],
  }],
}
```

Cada figura es una función de ese objeto. Cambias el texto y las cinco Vistas, las exportaciones por Fase y la red consolidada salen consistentes, porque ninguna guarda su propia copia del nombre.

## El editor es el exportador

El playground es un formulario a la izquierda y la figura a la derecha, y los botones de PNG y PDF exportan el mismo SVG que ya está en pantalla.

![El playground: a la izquierda el formulario que edita la Fase 0, a la derecha la Vista Resumen redibujada, y arriba las pestañas de Fase](/blog/spem-playground-editor.png)

Sin ida y vuelta a una herramienta de dibujo no hay una segunda copia que sincronizar. También hace posibles figuras que nadie dibujaría: el modelo consolidado, las cinco Fases como una sola red, sale de 4360 por 9380 píxeles. Esa figura nunca se iba a mantener a mano.

## La objeción obvia

Escribiste una herramienta para no dibujar veinticinco cajas. Sí. EPF Composer ya existe, es la implementación de referencia de esta notación, y es una aplicación de Eclipse publicada en 2008.

El punto de equilibrio honesto no son las primeras veinticinco figuras. Es la tercera revisión de esas veinticinco. Este modelo lleva dieciséis registros de decisión de arquitectura, y uno de ellos borra un Rol y reparte sus ocho Tareas entre otros dos. Si tu diagrama se dibuja una vez y se pega una vez, dibújalo a mano y deja de leer.

Las figuras son una salida de build. Cualquier otra cosa es una copia del modelo que empieza a quedarse vieja el día que alguien renombra un Rol.
