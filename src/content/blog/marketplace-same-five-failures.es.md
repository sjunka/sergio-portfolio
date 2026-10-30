---
title: Silk Road y Coupang fallaron en los mismos cinco puntos
date: 2026-10-17
summary: Un mercado oscuro en 2013 y una gran empresa de comercio electrónico en 2025 se rompieron en los mismos cinco puntos, y mapearlos sirve más que arrancar con las 74 amenazas de una herramienta de modelado.
tags: seguridad, arquitectura
---

Silk Road y Coupang casi no tienen nada en común. Uno era un mercado criminal en Tor, cerrado en 2013. La otra es una gran empresa surcoreana de comercio electrónico, multada con un monto récord en 2026. Fallaron en los mismos cinco puntos, con doce años de diferencia, y en ninguno de los dos casos alguien rompió un algoritmo.

Leí ambos casos para mi curso de seguridad, en documentos judiciales, hallazgos de reguladores y prensa. Donde las fuentes discrepan o no pude verificar una cifra, lo digo.

## Dibuja la frontera y numera las fallas

<figure>
<svg viewBox="0 0 640 170" role="img" aria-label="Mapa de la frontera de confianza: compradores, vendedores y personal afuera; login, pagos, servidores y logs adentro; cinco fallas numeradas, con el 1 en login y pagos">
  <defs>
    <marker id="mf-h" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0L7,3L0,6z" class="dg-head"/></marker>
  </defs>
  <rect x="124" y="4" width="392" height="162" rx="12" class="dg-plate"/>
  <text x="136" y="20" class="dg-m">FRONTERA DE CONFIANZA</text>
  <rect x="0" y="28" width="96" height="126" rx="8" class="dg-node"/>
  <text x="48" y="80" text-anchor="middle" class="dg-t">2. Compradores</text>
  <text x="48" y="98" text-anchor="middle" class="dg-s">y vendedores</text>
  <rect x="544" y="28" width="96" height="126" rx="8" class="dg-node"/>
  <text x="592" y="80" text-anchor="middle" class="dg-t">4. Personal</text>
  <rect x="136" y="28" width="172" height="56" rx="8" class="dg-node-accent"/>
  <text x="148" y="52" class="dg-t">1. Login y tokens</text>
  <rect x="136" y="98" width="172" height="56" rx="8" class="dg-node-accent"/>
  <text x="148" y="122" class="dg-t">1. Pagos</text>
  <rect x="332" y="28" width="172" height="56" rx="8" class="dg-node"/>
  <text x="344" y="52" class="dg-t">3. Servidores y llaves</text>
  <rect x="332" y="98" width="172" height="56" rx="8" class="dg-node"/>
  <text x="344" y="122" class="dg-t">5. Logs y alertas</text>
  <path d="M98,56H132" class="dg-flow" marker-end="url(#mf-h)"/>
  <path d="M98,126H132" class="dg-flow" marker-end="url(#mf-h)"/>
  <path d="M542,56H508" class="dg-flow" marker-end="url(#mf-h)"/>
  <path d="M508,126H542" class="dg-flow" marker-end="url(#mf-h)"/>
</svg>
<figcaption>Los dos 1 son una misma causa en dos lugares: una sola validación con toda la confianza.</figcaption>
</figure>

Un modelo de amenazas empieza como un mapa de lo que está adentro, lo que está afuera y qué flujos cruzan la frontera de confianza.

## Dónde fallaron los dos

Una validación cargó con toda la confianza (1). En septiembre de 2012, según Bitcoin Magazine sobre el caso del Departamento de Justicia, un usuario con al menos nueve cuentas falsas mandó más de 140 transacciones en rápida sucesión, el sistema de retiros perdió la cuenta de lo pagado y salieron más de 50.000 BTC. No pude descargar el comunicado del Departamento; esas cifras son de la revista y el mecanismo exacto no es público. Coupang, en su login: según Seoul Economic Daily, un token se aceptaba solo por su firma, así que la llave de firma abría cualquier cuenta.

Cualquiera podía entrar (2). Silk Road tenía registro abierto. En Coupang, dice el ministerio de ciencia, un exempleado fabricó tokens de login y entró a cuentas de clientes.

Secretos y configuración (3) fallaron dos veces. El servidor de Silk Road era alcanzable fuera de Tor. Cómo lo halló el FBI es materia de disputa: su declaración judicial culpa al CAPTCHA del login, los críticos a una página expuesta de PHPMyAdmin. En Coupang, la llave de firma de un ingeniero que construyó parte de la autenticación sobrevivió a su salida en noviembre de 2024.

El punto débil puede ser una persona (4). NBC News, sobre los documentos judiciales: el operador de Silk Road promocionó el sitio con un alias, pero usó un Gmail y una cuenta de Stack Overflow con su nombre real. Reuters: el exempleado de Coupang conocía las fallas de la autenticación que ayudó a construir.

Nadie se dio cuenta a tiempo (5). El operador de Silk Road supo de una fuga de IP tras un DDoS en marzo de 2013. En Coupang el acceso no autorizado duró de abril a noviembre de 2025, según el ministerio, y avisaron clientes que recibieron correos amenazantes. Coupang notificó a las autoridades más de 53 horas después de avisar a su jefe de seguridad, con un plazo de 24, según Reuters, y la multa cita unos cinco meses de logs borrados pese a una orden de conservación.

## Contar amenazas no es hacer triage

La Threat Modeling Tool de Microsoft convirtió el mismo diagrama, siete elementos y 13 flujos, en 74 amenazas STRIDE: 28 tipos genéricos repetidos en los flujos, todas en prioridad High, ninguna con revocación, rotación, límite de tasa o concurrencia. Un diagrama de flujo de datos registra que un flujo existe, no cuántas veces se dispara ni cuánto sobrevive una llave a su autor. (Validado con el código de carga de la herramienta, no en su interfaz de Windows.)

Mi profesor dijo que un análisis completo puede dar entre 500.000 y un millón de escenarios de riesgo y que el trabajo es concentrarse en los críticos. Prefiero escogerlos a partir de dos incidentes que de una lista donde todo es High.

## La objeción: un mercado criminal no es un retailer

Un mercado criminal y una empresa legítima, dice la objeción, no son comparables. Los adversarios sí difieren: el de Silk Road era la policía, el de Coupang un exempleado y luego un regulador. Pero cambiaron el negocio, la década y el atacante, y el tipo de falla no, lo que apunta a la causa y no al contexto. Lo que cambia es la factura: un arresto y un cierre, frente a una multa de unos US$409 millones, que puede cambiar si Coupang la impugna, y 37,5 millones de personas expuestas según el regulador. Coupang discute el alcance de la fuga. Dos casos no son una ley y la división en cinco puntos es clasificación mía.

## La lista de chequeo

Para la revisión de diseño de cualquier sistema que custodie dinero o datos ajenos.

1. Haz atómico el débito, prueba con solicitudes concurrentes, valida los tokens contra una sesión. Costo: latencia.
2. Limita la tasa por cuenta e IP, pon tope a cuentas nuevas, exige MFA. Costo: fricción.
3. Saca los paneles admin de Internet, rota secretos, revoca llaves el día que alguien se va. Costo: automatizar.
4. Aplica mínimo privilegio, separa funciones, verifica la baja. Costo: procesos.
5. Alerta por volumen por token, guarda logs inmutables, planea la notificación. Costo: falsos positivos.
