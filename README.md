# OpenFING Server

Este es el proyecto server de la plataforma de OpenFING.

## Levantar el proyecto

Para levantar el proyecto, es necesario tener instalado [Node.js](https://nodejs.org/en/) y tener [PostgreSQL](https://www.postgresql.org/) instalado y corriendo. Luego, seguir estos pasos:

-   Clonar el repo y abrir la terminal en la carpeta generada.
-   Correr `npm i` para instalar las dependencias del proyecto.
-   Crear un archivo de variables de entorno `.env` en la misma carpeta. El archivo deberá tener las mismas entradas que el archivo `.env.example`. Usar los comentarios en este último archivo para asignar los valores correctos.
-   Crear una base de datos en la instalación de PostgreSQL con el mismo nombre asignado a la variable de ambiente `WRITE_DB_NAME` en el paso anterior.
-   Correr el comando `npm run typeorm -- query "CREATE SCHEMA openfing"` para crear el schema openfing, y luego `npm run typeorm -- schema:sync` para crear las tablas definidas en este proyecto.
-   Correr el comando `npm run start:dev:watch`. Dependiendo del valor de la variable de ambiente `PORT`, el servidor estará escuchando en `http://localhost:$PORT/`.
-   Para acceder al Playground de GraphQL, acceder desde el navegador a la url anterior agregando `v1/graphql` al final. Por ejemplo, si `PORT=5000` entonces acceder a http://localhost:5000/v1/graphql

## Datos de prueba

Al momento solo se puede hacer a mano desde la instalación de PostgreSQL.

`// TODO: agregar datos de prueba`

## License

[MIT](https://choosealicense.com/licenses/mit/)
