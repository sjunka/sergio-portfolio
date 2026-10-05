---
title: Un modelo de ACV con 95% de accuracy que no encuentra a nadie
date: 2026-10-01
summary: En un dataset donde menos del 5% de los pacientes tuvo un ACV, la accuracy premia al modelo que no detecta a nadie, y la métrica que importa es a cuántos pacientes citas por cada caso que captas.
tags: aprendizaje-automático, proceso
---

Toma 5109 pacientes, de los cuales 249 tuvieron un ACV. Eso es el 4.87%. Ahora arma el clasificador más perezoso posible: responder "no ACV" para todo el mundo. Saca 95.1% de accuracy, y nunca mandaría a una sola persona a un programa de prevención.

No me lo inventé como experimento mental. Ese número salió de mi propia línea base sobre el Stroke Prediction Dataset de Kaggle, que es público, para un proyecto del curso de aprendizaje de máquina aplicado. El planteamiento es una EPS con un programa de prevención cardiovascular que cada mes solo puede citar a una parte de sus afiliados y tiene que escoger a quién.

## La accuracy cuenta lo que no es

La accuracy es la proporción de respuestas correctas. Cuando una clase es el 95% de los datos, acertar esa clase es casi todo el puntaje, y la minoría apenas lo mueve. Estas son las cuatro líneas base, cada una medida con validación cruzada de 5 folds sobre el 80% de los datos, con el otro 20% apartado y sin tocar:

| Modelo | Accuracy | Recall | Precisión | PR-AUC |
| --- | --- | --- | --- | --- |
| Siempre "no ACV" | 0.951 | 0.000 | 0.000 | 0.049 |
| kNN, k = 15 | 0.951 | 0.000 | 0.000 | 0.118 |
| Regla actual: edad 60+ o hipertensión | 0.719 | 0.779 | 0.123 | |
| Regresión logística balanceada | 0.742 | 0.819 | 0.138 | 0.192 |

Si lees solo la columna de accuracy, ganan las dos primeras filas. Son las inútiles. kNN es el fracaso que más enseña, porque no está vacío: su ordenamiento tiene algo de señal, un ROC-AUC de 0.71. Pero con el umbral por defecto de 0.5 ningún paciente junta suficientes vecinos con ACV para cruzar la línea, así que marca a todos como sanos. El modelo sabe algo y el umbral lo bota.

## Escoge una métrica que solo se mueva cuando encuentras los casos

El recall es la proporción de ACV reales que captaste. La precisión es la proporción de citados que resultaron ser casos reales. Ninguna de las dos gana nada con el 95% de la mayoría, y justo por eso sirven aquí.

Para comparar modelos sin escoger antes un umbral uso PR-AUC, el área bajo la curva de precisión y recall. Su piso es la prevalencia, así que adivinar al azar da 0.049 en estos datos, no 0.5 como sugeriría el ROC-AUC. El 0.192 de la regresión logística es casi cuatro veces el azar. En ROC-AUC el mismo modelo marca 0.84, que suena mucho más terminado de lo que está.

```py
# sklearn: score the ranking, not the default threshold
cross_val_score(pipe, X, y, cv=StratifiedKFold(5), scoring='average_precision')
```

`average_precision` es el nombre que sklearn le da al PR-AUC. Y `StratifiedKFold` también importa: con 249 positivos, una partición sin estratificar le puede dar a un fold bastantes menos ACV que a otro, y los puntajes bailan por razones que no tienen nada que ver con el modelo.

## El umbral es una decisión de negocio

Una precisión de 0.138 suena terrible. Dale la vuelta y dice: por cada siete pacientes que citas, uno resulta ser un caso real. Esa es una frase con la que el coordinador del programa puede hacer algo, porque su restricción son citas por mes, no una probabilidad.

Así que el umbral no es 0.5 y no lo escoge el modelo. Es el punto de la curva de precisión y recall que capta al menos el 80% de los casos con la mayor precisión disponible, y se mueve cuando cambia la capacidad de la clínica. La meta del proyecto es recall de al menos 0.80 con precisión de al menos 0.15, más o menos tres veces la tasa base.

La regla que la EPS ya usa es el rival de verdad, y no es mala. Edad de 60 o más, o hipertensión, cita al 30.8% de los pacientes y capta el 78% de los ACV. Una regresión logística sin ajustar ya le gana en recall y en precisión. Ninguna línea base llega todavía a 0.15, y esa brecha es todo el proyecto.

## La objeción: rebalancea los datos y ya

La respuesta de siempre es sobremuestrear la minoría con SMOTE, o ponderar las clases, y volver a la accuracy. Ponderar las clases es lo que ya hace la regresión logística de la tabla, y ayuda. Pero no rescata la accuracy: un modelo balanceado sacrifica accuracy a propósito, 0.742 frente a 0.951, porque ahora está dispuesto a marcar gente sana. La métrica sigue castigando justo el comportamiento que querías.

Rebalancear cambia lo que el modelo aprende. No cambia lo que el negocio necesita medir. Y si usas SMOTE, tiene que correr dentro de cada fold de entrenamiento, después de la partición. Si lo corres antes, copias sintéticas de pacientes de prueba se cuelan en el entrenamiento, y la validación cruzada reporta un modelo que no existe.

## Lo que ya dice el EDA

La edad domina. La tasa de ACV pasa de 0.4% en menores de 40 a 18.0% en mayores de 70. La cardiopatía la lleva de 4.2% a 17.0% y la hipertensión de 4.0% a 13.3%. El IMC casi no separa los grupos. Ninguna variable pasa de 0.25 de correlación con el desenlace, y por eso espero que los ensambles de árboles encuentren interacciones, como edad con glucosa, que un modelo lineal no ve. Eso es una apuesta hasta que corra la comparación.

Un modelo que saca 95% en estos datos no aprendió nada sobre ACV. Aprendió la prevalencia.
