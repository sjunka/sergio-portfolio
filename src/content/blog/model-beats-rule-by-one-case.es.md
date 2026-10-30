---
title: Mi modelo le ganó a la regla por un caso de cada cincuenta, y lo defiendo
date: 2026-10-27
summary: Con el mismo número de pacientes citados, un modelo de ACV captó unos dos casos más de cada cuarenta que la regla a la que reemplaza, y una prueba sellada de cincuenta solo pudo decir que va en la misma dirección.
tags: aprendizaje-automático, proceso
---

De los 50 ACV de mi prueba sellada, mi modelo encontró 40. La regla que debería reemplazar encontró 39, citando al mismo número de pacientes. El intervalo del 95% de esa diferencia va de 0 a 4, así que la prueba sola no puede decir que el modelo va por delante. Lo reporto de todos modos. Una ganancia tan pequeña es fácil de enterrar y fácil de inflar.

Es un proyecto de mi curso de aprendizaje de máquina aplicado, con el Stroke Prediction Dataset, que es público, y una EPS hipotética que cada mes solo puede citar a una parte de sus afiliados. No es una herramienta clínica. La etiqueta registra quién ya tuvo un ACV; no puede decir quién lo tendrá. La regla de la EPS es edad de 60 o más, o hipertensión. Cita al 30.8% de los pacientes y capta el 78% de los ACV.

## Mide con el mismo presupuesto de la regla

La regla es el rival y los pacientes que cita son el presupuesto. A cada modelo lo evalúo con ese presupuesto: ordeno a los pacientes por puntaje de riesgo, cito a tantos como citó la regla y cuento los ACV que encuentra de más.

La validación cruzada anidada sobre el 80% de entrenamiento da 20 evaluaciones de unos 817 pacientes y 40 ACV cada una. Un ciclo interno escoge los hiperparámetros de cada modelo y uno externo lo evalúa con pacientes que no participaron en esa elección. Veinte evaluaciones me dejan ver el ruido en vez de adivinarlo.

La regresión logística encontró 1.75 casos más por evaluación que la regla, con una desviación estándar de 1.55. Quedó por delante en 15 de las 20, empató en 4 y quedó por detrás en 1.

## Tres criterios escogieron tres modelos

Pasaron cinco candidatos: dos regresiones logísticas, kNN, random forest y gradient boosting. El PR-AUC, la métrica con la que ajusté los hiperparámetros, pone primero a gradient boosting. Con el presupuesto de la regla, ese modelo encontró 1.30 casos extra, cuarto de los cinco, con una dispersión de 2.62. Los casos extra ponen primero al random forest, con 2.40 ± 1.67.

[El post anterior](/blog/accuracy-hides-the-minority) terminó con una apuesta: que los ensambles de árboles encontrarían interacciones que un modelo lineal no ve. Los datos no la respaldaron. El random forest le sacó a la regresión logística 0.65 casos, por delante en 12 de las 20 evaluaciones y por detrás en 6, frente a una dispersión de 1.67 entre evaluaciones. No puedo distinguir eso de la suerte, y el otro ensamble quedó atrás.

Antes de la corrida final había escrito qué hacer en ese caso: cualquier modelo a menos de una desviación estándar del mejor cede ante el más simple. Todos menos kNN cayeron dentro de esa línea, así que ganó la regresión logística, que además se lee coeficiente por coeficiente. Eso es un procedimiento, no una afirmación de que los modelos sean iguales: puede que el random forest sea de verdad un poco mejor.

## La prueba sellada solo apunta en la misma dirección

Aparté el 20% de los pacientes antes de mirar nada más: 1022, de los cuales 50 tuvieron un ACV. Fijé el modelo, los hiperparámetros y el umbral para citar sin usarlos. Después abrí la prueba una sola vez.

El 40 contra 39 tiene un intervalo de 0 a 4, sacado de 1000 remuestreos bootstrap de la prueba. Con 50 casos, un solo caso mueve el recall 2 puntos, así que la prueba puede apuntar, pero no demostrar. Apunta en la misma dirección que las 20 evaluaciones, y eso es todo lo que dice.

Su función principal era frenarme. Si hubiera usado la prueba para escoger un modelo, habría sido un conjunto de validación más y no me quedaría ningún número honesto.

## La objeción: un caso de cada cincuenta no es nada

Una ganancia tan pequeña no merece reportarse, dice la objeción, y un modelo más grande conseguiría un número más grande.

El tamaño es el hallazgo. Prefiero publicar +1 con un intervalo de 0 a 4 que un titular apoyado en una partición con suerte. Y +1 no es poca cosa en la unidad de la EPS: con el umbral que fijé, 0.504, el modelo alcanzó recall de 0.80 fuera de fold citando al 28.5% de los pacientes, mientras la regla cita al 30.8% para llegar a 0.78. La regla ya tiene la edad, que pesa el 63% del modelo (SHAP absoluto medio), así que lo esperable es una ganancia pequeña. Entre 18 y 59 años el modelo capta 0.35 de los casos frente a 0.22 de la regla, y aun así se le escapan dos de cada tres.

En cuanto a modelos más grandes, sí los corrí: el mejor sacó 0.65 casos de ventaja y gradient boosting salió peor. Una red neuronal no la entrené, así que esto es razonamiento y no una medición: una pequeña, con 22 entradas y 16 neuronas ocultas, tiene unos 385 parámetros, frente a 199 ACV para aprenderlos. La regresión logística tiene 22.

## Una plantilla para la afirmación

Así escribo cualquier afirmación de que un modelo le gana a una regla. Un espacio que no puedo llenar quiere decir que aún no está lista.

```text
Presupuesto: la regla cita al __% de las personas; el modelo se evalúa con ese mismo __%.
Evaluaciones repetidas (__ de unos __ positivos): __ casos más que la regla, dispersión __, por delante en __ de __.
Prueba sellada, abierta una vez (__ positivos): modelo __, regla __, diferencia __ (intervalo del 95% de __ a __).
Desempate entre modelos parecidos, fijado antes de la corrida final: __.
Qué registra la etiqueta: __.
```

La mía dice 1.75 casos más por cada 40, por delante en 15 de 20, y 40 contra 39 en la prueba sellada.
