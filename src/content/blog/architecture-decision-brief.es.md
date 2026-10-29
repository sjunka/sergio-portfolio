---
title: Una decisión que nadie puede discutir es solo una descripción
date: 2026-10-29
summary: Cómo escribir una decisión de arquitectura que quien la revisa pueda discutir, con un diseño en AWS que cuesta 173 dólares al mes, o 292 en campaña, y una plantilla para copiar.
tags: nube, arquitectura
---

"Usé Auto Scaling porque mejora la escalabilidad" es una frase con la que nadie puede discrepar, y por eso no le dice nada a quien revisa. Compara: "Dos instancias en dos zonas de disponibilidad y sin segunda región, porque supongo que el negocio acepta 99.9% y una segunda región casi duplicaría el costo fijo." Alguien puede discutir el supuesto, la duplicación o que dos zonas alcancen. Cada objeción tiene a dónde apuntar.

Escribí frases del segundo tipo para la entrega final de mi curso de computación en la nube, un brief de dos páginas sobre un caso de estudio: un comercio de café que lleva su tienda web a AWS antes de una campaña nacional. Mi profesor dijo que la nota premia la justificación y no el servicio escogido, y nombró "porque hoy todo es Kubernetes" y "por portabilidad" como respuestas que no valen nada. Yo le exigiría lo mismo a cualquier revisión de arquitectura. La decisión de acceso tiene [su propio post](/blog/reachable-is-not-authorized); estas tratan de fallas y dinero.

## El 99.9% fue un número mío

El caso no daba una meta de disponibilidad, así que supuse una y dejé escrito quién tiene que confirmarla: el negocio acepta 99.9% en la campaña, unos 43 minutos de caída al mes. Dos zonas lo cubren, según mi argumento y no según una medición. El balanceador de carga deja de mandar tráfico a una instancia caída, Auto Scaling la reemplaza, y un standby síncrono de la base en la segunda zona cuesta 26 dólares al mes más que una base en una sola zona.

Un warm standby en una segunda región casi duplicaría el costo fijo, 147 de los 173 dólares de un mes normal (es una estimación mía, nunca le puse precio), así que lo descarté. Si cae una región, restauro desde backups y plantillas en otra: cuatro horas para volver a vender y hasta una hora de datos perdidos, dos metas que yo fijé y ninguna medida. Si el negocio pide recuperar la región en menos de una hora y lo paga, la decisión se invierte.

La evidencia es una sola corrida. En mi lab terminé una instancia: el balanceador la sacó a los 35 segundos, un reemplazo atendía a los 2 minutos 40 y la página nunca dejó de responder. El grupo usaba el health check de tipo EC2, que habría ignorado una app colgada, así que el diseño usa el del balanceador. El failover de la base nunca lo corrí, y el brief nombra la prueba.

## Un solo NAT gateway, y sobre qué se apoya

Un solo NAT gateway en vez de uno por zona ahorra 37 dólares al mes a precio de lista: las horas del gateway más su IP pública. Se apoya en premisas que quien revisa puede atacar una por una. Las instancias arrancan desde una imagen ya preparada y no descargan nada. El pago es un checkout alojado que confirma con un webhook entrante, así que nada llama al proveedor. Por el NAT solo salen los parches y Session Manager: si cae su zona, la otra sigue vendiendo y pierde ambos hasta que se recree el gateway.

Si resulta que el proveedor de pagos necesita llamadas salientes, vender pasa a depender del NAT y compro el segundo. Igual que el failover, esto no está probado, porque mis labs nunca tocaron un NAT. La prueba prevista quita la ruta al NAT de una subnet de la app y hace un pedido.

## Cotiza el mes para el que existe el diseño

Mi primer borrador calculó un mes normal de memoria: 150 a 200 dólares, frente a los 173 que verifiqué después. No tenía mes de campaña. Las cifras finales salen de la Price List API de AWS, consultada el 21 y el 23 de octubre: precios de lista bajo demanda, meses de 730 horas, CloudFront a la tarifa de Sudamérica, sin capa gratuita. Un mes de campaña da 292, y es un techo a propósito: 600 GB y 150 mil pedidos, cerca del doble de lo que darían diez veces el tráfico durante cinco días.

En un mes normal el 85% de la cuenta es fijo, así que la elasticidad no toca la mayor parte. En el mes de campaña las cuatro instancias extra cuestan 10 dólares, los créditos de CPU 22 y CloudFront 88. Tener seis instancias todo el mes costaría 61 más que dos, así que escalo y trato el seis como techo.

## La objeción: los equipos reales no tienen quien califique

La objeción razonable es que escribo razones porque alguien las califica, y un equipo real no tiene a nadie calificando. Pero quien califica es un sustituto. Toda decisión real termina con un lector: quien hereda el sistema cuando su autor ya se fue, o quien pregunta por qué se duplicó la factura. Un diagrama sobrevive al autor. Las razones sobreviven solo si alguien las dejó escritas, y son las que le permiten a ese lector reabrir una decisión cuando se cae su premisa, en vez de conservar el diseño entero o tirarlo. Y lo que importa no se deja rellenar, porque un precio tiene que coincidir con la lista y una prueba tiene que pasar.

## El registro de decisión

Cada decisión del brief siguió esta forma; una línea va rellena con la mía.

```text
Decisión:           qué hacemos, en una frase
Porque:             la restricción, su número, quién lo confirma
Descartado:         cada alternativa, y por qué pierde
Costo:              al mes a precio de lista, con la fecha de consulta
Riesgo que acepto:  qué se rompe si me equivoco, y qué me avisa
Evidencia:          qué corrí, o "sin probar" y la prueba
Revisar si:         la premisa que, si falla, invierte la decisión

Ejemplo, Revisar si: el proveedor de pagos exige llamadas salientes,
porque entonces vender depende del NAT.
```

Un diagrama dice qué escogí. El registro dice por dónde discutirlo.
