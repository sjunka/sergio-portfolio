---
title: El mejor release mobile es el que nadie nota
date: 2026-06-05
summary: Diez años enviando builds a las tiendas me enseñaron que la calidad de un release es una propiedad del proceso, no una fase de pruebas.
tags: proceso, mobile
---

Un equipo web despliega mal y hace rollback en cuatro minutos. Un equipo mobile publica un build malo y espera día y medio a que lo revisen, mientras la gráfica de crashes hace algo perturbador delante de toda la empresa. Cada hábito de release que vale la pena tener sale de esa asimetría.

## Corta la rama por calendario, no cuando el trabajo esté listo

Si la fecha del release se mueve porque una feature no está lista, entonces todas las features están negociando con el release, y el release siempre pierde. Elige un día. Corta la rama ese día. Lo que esté mergeado y detrás de un flag sale, lo que no espera al siguiente. Suena rígido hasta la primera vez que alguien pide "meter esto rapidito" y la respuesta es una fecha en lugar de una discusión.

## Los feature flags son cómo consigues hacer rollback

No puedes des-publicar un binario. Sí puedes apagar algo dentro de un binario que ya publicaste. Esa es toda la razón por la que los flags se ganan su complejidad en mobile, y por eso el flag tiene que leerse en el punto de uso y no una sola vez al arrancar:

```ts
// Alguien que abrió la app antes de que apagaras el kill switch
// se queda con la pantalla rota toda la sesión.
const showNewCheckout = flags.get('new-checkout')

// Lee el estado actual, así el kill switch de verdad mata.
function Checkout() {
  const showNew = useFlag('new-checkout')
  return showNew ? <NewCheckout /> : <LegacyCheckout />
}
```

Cada flag necesita un ticket de remoción creado el mismo día que el flag. Un flag que lleva dos años ahí no es un flag, es una rama en tu código que nadie tiene la confianza de borrar.

## El rollout escalonado no es opcional y 1% no alcanza

Las dos tiendas te dejan publicar a una fracción de usuarios. Úsalo, pero sé honesto con la aritmética: 1% de una base pequeña es una muestra demasiado chica para mostrarte algo antes de que ya estés en 100%. Prefiero 10% durante 24 horas y ver de verdad cómo se mueve la tasa de sesiones sin crash, que 1% por una hora y llamarlo canary.

Ten claro qué número aborta el rollout, y tenlo claro antes de empezar. "Sesiones sin crash por debajo de 99.5%, paramos" es una decisión. "Lo vamos mirando" es cómo te enteras el lunes.

## Versiona el build, no el sprint

Pon el SHA del commit en una pantalla de ajustes donde soporte pueda leerlo en voz alta. Cuando un usuario reporta algo imposible, la primera pregunta es qué build, y "la última" nunca es cierto. Esto cuesta una tarde una sola vez y te salva siempre.

## La parte que es cultural

Nada de lo anterior funciona si un release es un evento. Si publicar requiere que tres personas se queden hasta tarde, vas a publicar menos seguido, cada release va a cargar más cambios, y cada release va a ser más riesgoso, lo que convierte al siguiente en un evento todavía más grande. La salida es aburrida: publica cosas más chicas más seguido hasta que deje de ser interesante.
