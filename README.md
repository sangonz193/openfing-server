# OpenFING Server

Este es el proyecto server de la plataforma de OpenFING.

## Configuración del entorno de desarrollo

### Herramientas requeridas

-   [Node.js](https://nodejs.org/en/): **v15**
    -   Se recomienda la instalación de node con [nvm](https://github.com/nvm-sh/nvm), ya que le permite cambiar entre versiones fácilmente.
-   [npm](https://www.npmjs.com/): **v6**
    -   Es importante que la versión de npm sea la requerida aquí, ya que diferentes versiones pueden causar cambios al archivo _package-lock.json_. Se puede instalar esta versión de npm corriendo el comando `npm i -g npm@6`.
-   [Docker](https://www.docker.com/): **con docker-compose**

### Pasos para levantar el proyecto

-   Clonar este repositorio y abrir una terminal dentro de la carpeta creada.
-   Correr el comando `npm i` para instalar dependencias.
-   Crear un archivo _.env_ en la carpeta del proyecto que contenga las variables contenidas en _.env.example_. Puedes copiar el archivo _.env.example_ y modificar los valores de las variables como creas necesario. `cp .env.example .env`.

### Ejecutando el servidor

Antes de correr el código en sí, la base de datos y Keycloak deben estar encendidos y corriendo. Para hacer eso, correr el comando `npm run docker-compose`.

Luego, correr el comando `npm run dev` (o `node cli dev`) para correr el servidor. Dependiendo en el valor de la variable `PORT` en el archivo _.env_, el servidor estará escuchando en _http<span></span>://localhost:\$PORT_. 

El GraphQL Playground es accesible en _http<span></span>://localhost:\$PORT/graphql_.

### Datos de prueba


Para popular la base de datos con algunos valores de prueba, correr el comando `node cli seed`. Tener en cuenta que este comando **ELIMINARÁ** todos los datos previos en la base de datos a la que el archivo _.env_ estuviera apuntando.

## Utilidad de línea de comandos incluída

Aparte de la aplicación en sí, este proyecto contiene una utilidad de linea de comandos que podrás encontrar útil para el desarrollo. Para llamarla, correr `node cli <command>` ubicado en la carpeta del proyecto. Para información sobre la herramienta, correr `node cli --help` el cual listará los comandos disponibles. Por más información sobre un comando en específico, correr `node cli <command> --help` donde _<command>_ es el nombre de un comando de la lista anterior.

## License

[MIT](https://choosealicense.com/licenses/mit/)
