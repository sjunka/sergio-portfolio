---
title: Llegar a un recurso en AWS no significa que tengas permiso de usarlo
date: 2026-10-04
summary: Misma instancia, mismo role, misma red, tres llamadas a S3 y dos respuestas distintas, y el experimento solo prueba algo si primero descartas la red.
tags: nube, arquitectura
---

Casi todos los problemas de AWS que veo descritos como "S3 no funciona desde mi instancia" son dos problemas distintos con el mismo error. Uno es de alcance: hay ruta, resuelve el DNS, deja pasar el paquete el security group. El otro es de autorización: esta identidad puede hacer esta acción sobre este recurso. Fallan en lugares distintos, se arreglan en consolas distintas, y confundir uno con el otro se come una tarde.

Corrí un experimento pequeño para el curso de computación en nube para separar los dos. El montaje es aburrido a propósito.

## Una identidad, una red, dos respuestas

Un bucket S3 privado con dos objetos, `allowed/context.txt` y `restricted/secret.txt`. Una instancia EC2 en una subnet pública, con un IAM role y sin access keys en ninguna parte. El role tiene exactamente una policy:

```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::dcl-s05-team01-ACCOUNT/allowed/*"
}
```

Sin `s3:*`, sin `Resource: "*"`, ni siquiera `ListBucket`. Desde la instancia corrí tres llamadas. `GetObject` sobre `allowed/context.txt` devolvió el archivo. `GetObject` sobre `restricted/secret.txt` devolvió `AccessDenied`. `PutObject` dentro de `allowed/` también devolvió `AccessDenied`.

Misma máquina, mismo role, misma ruta, mismo segundo. Lo único que cambió entre las tres llamadas fueron el `Action` y el `Resource`, que son lo único de lo que habla la policy. Una llamada falló por el recurso y la otra por la acción.

## Prueba quién llama antes de leer la respuesta

Un `Allow` o un `Deny` no significan nada hasta que sabes qué identidad lo recibió. El primer comando en la instancia no fue una llamada a S3:

```sh
aws configure list                  # keys show type iam-role, nothing typed by hand
aws sts get-caller-identity         # arn:aws:sts::...:assumed-role/dcl-dev-role-s05/i-...
```

Si hubiera quedado una access key olvidada en `~/.aws/credentials`, todos los resultados siguientes describirían los permisos de otro usuario. La sesión del role en el ARN es la evidencia de que el experimento prueba la policy que yo escribí.

## Descarta todo lo demás, o la negación no prueba nada

La parte que la gente se salta es el control. Un `AccessDenied` solo es evidencia de autorización si nada más pudo haber producido una falla.

Por eso el objeto restringido ya existía antes de la prueba: pedir una llave que no existe da 404 o 403 según lo que puedas listar, y esa es otra pregunta, no la que yo estaba haciendo. La cuenta arrancó desde una base limpia, sin gateways ni route tables sobrantes de labs anteriores. Y que el `GetObject` permitido funcione es el control de red: prueba que la ruta, el DNS y el security group sirven. Cada camino que necesitaban las llamadas negadas, la llamada permitida lo acababa de usar.

Eso es lo que lo vuelve un experimento y no una demo. Una demo muestra la negación. Un experimento muestra que la negación solo pudo venir de un lugar.

## Cada control responde una pregunta distinta

El lab suma dos controles más y vale la pena ser preciso con lo que cada uno no hace.

Los objetos están cifrados en reposo con SSE-S3, cosa que `put-object` confirma con `"ServerSideEncryption": "AES256"`. Eso protege el disco. No hace nada frente a un role que tiene permiso de leer, porque S3 descifra de forma transparente para cualquiera autorizado. Cifrar no es controlar el acceso, y un bucket cifrado con `s3:*` en una policy está abierto de par en par.

CloudTrail responde "quién cambió esto". La llamada `AttachRolePolicy` que le dio el permiso al role aparece en Event history con quién la hizo y a qué hora. No evita nada. Es como te enteras, después, de quién amplió una policy.

Entonces el role dice quién, la policy dice qué y sobre qué recurso, el cifrado cubre el disco y CloudTrail registra quién cambió qué. Cuatro controles, y ninguno reemplaza a otro.

## La objeción: una subnet privada ya es suficiente seguridad

El reparo más fuerte que oigo es que si la instancia no llega a Internet, el detalle de IAM es académico. No me convence. Un VPC endpoint o un NAT vuelven a poner S3 al alcance con un solo cambio en la route table, y S3 es alcanzable desde cualquier lado por diseño. Los controles de red deciden quién puede tocar la puerta. No saben nada del objeto que pediste. El día que alguien agregue un gateway endpoint por otra razón, la policy es lo único que sigue diciendo que no.

En el brief de arquitectura que estoy escribiendo para el mismo curso, la capa de aplicación lleva un role con esta forma y sin llaves, y la base de datos queda detrás de un security group que solo acepta el security group de la app. Son dos muros distintos para dos ataques distintos. Ninguno es el respaldo del otro.

La próxima vez que aparezca `AccessDenied`, revisa quién está llamando antes de ir a mirar la route table.
