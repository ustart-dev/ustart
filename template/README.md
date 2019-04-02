# uStart

uStart es un framework para construir backends en GraphQL y NodeJS, utiliza graphql-yoga, sequelize y mongoose para conectar con múltiples fuentes de datos.

## Estructura de directorio

La estructura del backend está organizada de la siguiente forma:

```
+-- config: Configuración de endpoint de la base de datos. Sólo es utilizada por sequelize-cli.
+-- migrations: Migraciones a ejecutar por sequelize-cli.
+-- server: Contiene el servidor graphql. Usualmente el contenido de este directorio no se modificará con frecuencia. El objetivo es que, lo que contenga este directorio se transforme en la base de ustart cloud.
|   +-- connectors: Contiene los conectores para las fuentes de datos. De momento también incluye Email.
|   +-- errors: Errores estándares del server.
|   +-- helpers: Funciones comunes y reutilizables por el server.
|   +-- middlewares: Middlewares de express cargados por el servidor.
|   +-- scripts: Scripts de ayuda para ejecutar tareas.
|   +-- constants: Constantes del servidor.
|   +-- index.js: Define el endpoint graphql, carga los middlewares de express, carga los esquemas, modelos, resolutores y permisos definidos por el usuario en "src/entities/", etc.
+-- src: Contiene las fuentes del usuario: Esquemas graphql, modelos, resolutores, directivas, permisos, etc.
|   +-- data: Datos base para arrancar el servidor, incluye mocks de datos básicos, registro de admin, datos fake y de testing dentro de la base de datos.
|   |   +-- base: Carpeta que contiene los datos base para arrancar un sistema.
|   |   +-- database: Contiene los script que el servidor carga para poblar los datasources. Nos referimos a estos script como mocking de base de datos.
|   |   +-- datasources.js: Script para establecer las conexiones hacia las fuentes de datos.
|   +-- directives: Contiene las directivas de esquema.
|   +-- entities: Contiene la lógica del sistema a constuir, incluye esquemas, modelos, resolutores, permisos y mocking de datos rápido (diferente al que se encuentra presente en el directorio "data"). Este directorio es inspeccionado automáticamente por el servidor para cargar los script correspondientes.
|   +-- helpers: Funciones de ayuda que define el usuario.
|   +-- mails: Plantillas de email.
|   +-- middlewares: Contiene los middlewares a cargar por el servidor.
|   |   +-- express.js: Permite establecer los middlewares que el servidor cargará en la instancia de express. Mismo objeto que expone graphql-yoga. Por defecto se incluyen cors y compression.
|   |   +-- graphql.js: Middlewares para resolutores. Estos middlewares son cargados posterior a los permisos (que se definen dentro de entities), quedando de la siguiente forma: middlewares: [shield(permissions), "your_middleware_1", "your_middleware_2", "your_middleware_n"].
|   +-- models
|   |   +--associations.js: Contiene las asociaciones para los modelos relacionales de Sequelize.
|   +-- shield: Contiene las reglas para la capa de permisos.
|   |   +-- options.js: Contiene las opciones a proporcionar a la instancia de shield.
|   |   +-- rules.js: Contiene las reglas de permisos a utilizar por el sistema.
|   +-- subscription: Contiene la instancia de publicación. El servidor cargará automáticamente las instancias exportadas.
+--- __tests__: Contiene los test de la plataforma. De momento incluye los test de la base de uStart (en un futuro estos deben ser movidos a su propio paquete) y tambien los test de la plataforma a construir. Este directorio es inspeccionado por Jest para detectar, cargar y ejecutar cualquier script JS con sufijo ".test." como parte de la suite de testing automático.
```

## ¿Cómo comenzar a utilizar esta plantilla?

### Requisitos

* node 8.9.3 o superior
* PostgreSQL 8 o superior

### Preparar

1. Clonar el repositorio.
1. Renombrar la carpeta `graphql-backend-template` por el nombre del proyecto.
1. Abrir el fichero `package.json` y establecer: nombre del proyecto, versión, descripción, keywords y license. Una vez finalizado guardar cambios.

### Desarrollo

1. Hacer una copia del fichero `server-start.sh` ubicado en `server/scripts/` en la raíz del repositorio.
1. Renombar el script recién copiado a `start.sh`. El fichero .gitignore tiene una entrada para ignorar este script por lo que no habrá problemas de ser comitido.
1. Crear en PostgreSQL una base de datos para desarrollo. Se recomienda añadir el sufijo `_test` (ej: `sistema-ab_test`), de esta forma el Sequelize podrá destruir y reconstruir la BD en cada ejecución. Ver más detalle sobre este comportamiento en la documentación del script `server-start.sh`.
1. Abrir y completar lo solicitado por el script, asegurando que el atributo `SERVER_MODE` quede establecido a `DEV` o `DEV-CLEAN`. En modo de desarrollo se puede utilizar el atributo `FAST_MOCKING` para deshabilitar la ejecución de los resolutores frente a una petición y activar la respuesta rápida.
1. Abrir terminal, dirigirse a la raíz del repositorio y ejecutar `./start.sh`.

### Testing

1. Hacer una copia del fichero `server-start.sh` ubicado en `server/scripts/` en la raíz del repositorio.
1. Renombar el script recién copiado a `start-testing.sh`. El fichero .gitignore tiene una entrada para ignorar este script por lo que no habrá problemas de ser comitido.
1. Crear en PostgreSQL una base de datos dedicada al testing automático. Se recomienda utilizar el mismo nombre que la BD de desarrollo mas el sufijo `-testing` mas el sufijo `_test` (ej: `sistema-ab-testing_test`).
1. Abrir y completar lo solicitado por el script, asegurando que el atributo `SERVER_MODE` quede establecido a `TESTING`. En modo de testing NO se debe activar el atributo `FAST_MOCKING` (se debe establecer a `false`), ya que este deshabilita la ejecución de los resolutores impidiendo el testing automático.
1. Abrir una terminal, dirigirse a la raíz del repositorio y ejecutar `./start-testing.sh`. Esto levantará una instancia del servidor en modo TESTING, apuntando a la BD de testing y junto con poblar con datos de testing.
1. Abrir una terminal, dirigirse a la raíz del repositorio y ejecutar `yarn run test`. Esto ejecutará toda la suite de test implementados dentro del directorio `__test__`. Para ejecutar un sólo test se debe utilizar el comando `yarn run test [nombreFicheroConSufijoTest]`, reemplazando `nombreFicheroConSufijoTest` por el nombre del fichero que contiene la suite de test. Por ejemplo: `yarn run test userQueries`.

### Producción

**PENDIENTE**

## ¿Cómo desarrollar?

Una vez se tengan listos los pasos de la sección anterior (¿Cómo utilizar esta plantilla?) se puede comenzar a desarrollar el backend del sistema requerido.

### ¿Por dónde comenzar?

Se recomienda iniciar por la **Integración** entre el frontend y el backend con el objetivo de avanzar en paralelo en el desarrollo de ambos entornos. Para ellos se ha diseñado la opción de arranque `FAST_MOCKING`. Esta opción deshabilita la ejecución de los resolutores y en su reemplazo activa las respuesta de mocking rápido. Se deben establecer previamente, dentro del esquema de la entidad a implementar, las `queries` y `mutations`, ya que estas son compartidas tanto por los resolutores como el mocking rápido.

Una vez acoplado los entornos se puede proceder a implementar la lógica interna de lo resolutores. Para ello se debe deshabilitar el modo `FAST_MOCKING` (establecer a `false`) y el backend responderá con la lógica de los resolutores.

Cabe destacar que cuando el modo `FAST_MOCKING` está activo el backend **NO** activa la lógica de permisos. Por lo que cualquier `query` y `mutation` que tenga restricción de roles será ejecutada sin restricción.

### ¿Qué son las entidades?

En el ámbito de este framework, una *entidad* puede ser:

- Una unidad lógica del negocio
- Un grupo de funciones que pertenecen a una categoría en común
- [SE ACEPTAN MAS IDEAS O MEJORAS EN ESTA DEFINICION]

La carpeta de entidades contiene gran parte del software que el usuario escribe y se ubica en la ruta `src/entities/`.

Cada entidad esta compuesta por lo siguiente ("x" representa un nombre de entidad cualquiera):

- `x.type.graphql`: Script que contiene el esquema y especificación GraphQL. El sufijo `type` y `graphql` es requerido. El nombre de la entidad debe ser en minúsculas. Este fichero es obligatorio.
- `x.model.js`: Script que contiene el modelo a utilizar, el cual puede ser definido para sequelize o mongoose.
- `x.resolvers.js`: Script que contiene los resolutores. El sufijo `resolvers` es requerido. El nombre de la entidad debe ser en minúsculas. Este fichero es obligatorio.
- `x.permissions.js`: Script que contiene la lógica de permisos a aplicar según las `queries` y `mutations` definidas en el esquema (`*.type.graphql`). El sufijo `permissions` es requerido. El nombre de la entidad debe ser en minúsculas.
- `mocks/x.mocks.js`: Script que contiene el mocking rápido. Sólo funciona si el modo `FAST_MOCKING` está activo. El sufijo `mocks` es requerido. El nombre de la entidad debe ser en minúsculas.

El framework busca y carga automáticamente las entidades, siempre y cuando cumplan con la nomenclatura establecida.

### ¿Qué son los modelos?

Los modelos representan el esquema de una tabla o colección, según sea el caso, en la base de datos, definidiendo sus atributos. El framework utiliza Sequelize v5 para conectar con bases de datos relacionales y mongoose v4 para MongoDB.

Los modelos se deben definir por entidad y estos deben ser creados manualmente, reflejando el esquema escrito en los `types` de graphql de cada entidad.

Por ejemplo, para una entidad `User` (ubicada en `src/entities/User`) se debe crear un script `user.model.js` que defina el modelo:

```javascript
import Sequelize from "sequelize";
import { ustart } from "../../server/connectors/ustart";

ustart.defineModel("postgres", "user", {
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});
```

```
No es requisito que cada entidad tenga un modelo, lo requerirán solo aquellas
que deban conectar con una tabla o colección en una BD.
```

Los modelos son utilizados dentro de los `resolvers`, así como también dentro de los mocks de base de datos (carpeta `src/data`) y testing.

Los modelos son inyectados automáticamente por el framework a los resolutores como parte del contexto de la aplicación.

**Trabajo futuro:** Se busca autogenerar los modelos en base a definiciones hechas en los esquemas de GraphQL. La idea es que la fuente de origen de los modelos sea una sola: los esquemas, incremetando la velocidad de desarrollo y disminuyendo la tasa de errores.

### ¿Cómo utilizar las suscripciones?

El framework utiliza las suscripciones que implementa el package `graphql-subscriptions`, por lo que el único trabajo extra que se realiza es la carga automática de una instancia `PubSub` que luego es añadida al contexto de la aplicación (misma forma que recomienda graphql yoga).

Mayor documentación:

* https://github.com/prisma/graphql-yoga#pubsub
* https://github.com/prisma/graphql-yoga/tree/master/examples/subscriptions
* https://github.com/apollographql/graphql-subscriptions

Se dispone de la carpeta `subscription` ubicada en `src` para implementar la lógica de las suscripciones. Se debe exportar una instancia de `PubSub` con el nombre `pubsub` dentro del `index.js` de la carpeta.

En caso de no utilizar suscripciones **NO** se debe exportar ninguna instancia de `PubSub`.

### ¿Cómo implementar los permisos?

La capa de permisos de usuario que incluye el framework es el package `graphql-shield`. Los permisos se deben establecer en dos formas: definir las reglas y aplicar las reglas.

Las reglas de permisos se definen e implementan en el script `src/shield/rules.js`, y deben seguir el formato del package. Este template incluye dos reglas básicas: `isAuthenticated` y `isAdmin` que son utilizadas por la entidad `User`. Las reglas deben ser exportadas para poder ser utilizadas en los scripts que definen qué será protegido y cómo (aplicar las reglas).

Las reglas se aplican en el script `*.permissions.js` de cada entidad, el cual debe exportar un objeto que establece qué aplica para cada Query y Mutation definidos en el esquema de la entidad (`*.type.graphql`). Mas detalle de como aplicar las reglas ver la documentación de `graphql-shield`.

**Nota**: La capa de permisos **NO** funciona cuando el modo `FAST_MOCKING` está activo.

### ¿Cómo utilizar las directivas de esquema?

El framework utiliza el formato de directivas de esquema proporcionadas por el paquete `graphql-tools`, por lo que el único trabajo extra que se realiza es la carga automática del objeto `schemaDirectives`, el cual es entregado a la función `makeExecutableSchema`.

Mayor documentación:

* https://www.apollographql.com/docs/graphql-tools/schema-directives.html

Se dispone de la carpeta `directives` ubicada en `src` para implementar la lógica de las directivas. Se debe exportar el objeto `schemaDirectives` (ubicado en el script `index.js`) con las directivas que se desean utilizar de la misma forma que lo explican en la documentación de `graphql-tools`.

En caso de no utilizar directivas **NO** se debe exportar el objeto `schemaDirectives`.

### ¿Cómo implementar testing automático?

El framework incluye el paquete de testing Jest, junto con su código base (User, Region y Parameters) cubierto por pruebas de integración.

Las pruebas deben ser escritas en la carpeta `__tests__` (ubicada en la raíz del proyecto). El contenido de la carpeta está estructurado de la siguiente forma:

- `utils.js`: Script que contiene funciones de ayuda para los diferentes tipos de prueba.
- `auth`: Carpeta que contiene las pruebas del código base para autenticación.
- `user`: Carpeta que contiene las pruebas del código base para los usuarios.

Para añadir las pruebas del sistema a implementar, se recomienda crear una carpeta que agrupe la lógica de negocio (similar a una entidad) y dentro de ella organizar de la siguiente forma (ver carpeta `user`):

- `mutations.js`: Script que exporta las mutaciones graphql a ser utilizadas por los test.
- `queries.js`: Script que exporta las consultas graphql a ser utilizadas por los test.
- `[nombre]Mutations.test.js`: Script que contiene las pruebas de integración de las mutaciones. Se debe utilizar el sufijo `.test.` para que Jest reconozca el script como parte de la suite de tests.
- `[nombre]Queries.test.js`: Script que contiene las pruebas de integración de las consultas. Se debe utilizar el sufijo `.test.` para que Jest reconozca el script como parte de la suite de tests.

Muchos de los tests que se escribirán requieren login. En el script `__tests__/auth/mutations.js` se encuentra la mutación de login. Debido a la frecuencia de uso de estas funciones, el script `utils.js` contiene varias funciones de ayuda para el login en diferentes escenarios, desde los más básicos: `getURL()` y `getPort()`, hasta la función más avanzada que retorna un cliente listo para utilizar: `getLoggedInClientAsync()`.

## Conectar con Datasources

El framework fue diseñado para conectar de forma simple y rápida cualquier fuente de datos, ya sea motor de bases de datos relacional, no relaciona u otros. De momento están soportadas las librerías Sequelize v5 y Mongoose v4.

El framework es capaz de conectar con múltiples fuentes de datos la mismo tiempo.

Añadir las fuentes de datos al script `datasources.js` ubicado en `src/data`. Se debe llamar al método `connect` de la clase `Ustart` expuesta por el framework, utilizando una URI hacia el endpoint.

PostgreSQL:
```javascript
import { ustart } from "../../server/connectors/ustart";

ustart.connect(process.env.PG_URI);
```

en donde `PG_URI` puede ser establecido en alguno de los script de arranque (ver siguientes secciones).

Más documentación sobre el formato de URI en [Sequelize](http://docs.sequelizejs.com/manual/usage.html#dialects) y [Mongoose](https://mongoosejs.com/docs/connections.html).

## Configuración del script server-start.sh

Este script tiene por objetivo arrancar el backend, establecer sus diferentes configuraciones de funcionamiento y las API keys de los servicios que se consumirán. A continuación se detallan las configuraciones.

Se recomienda añadir la variable de entorno para los datasources:

- PostgreSQL: Se recomienda utilizar `PG_URI`.
- MySQL: Se recomienda utilizar `MYSQL_URI`.
- MongoDB: Se recomienda utilizar `MONGO_URI`.

JSON Web Tokens (JWT):

- `JWT_SECRET`: Semilla utilizada para cifrar el token de sesión de los usuarios. Parámetro obligatorio.

GraphQL endpoint:

- `GRAPHQL_ENDPOINT_PORT`: Puerto de escucha para las peticiones GraphQL. Si no se especifica el backend utiliza por defecto el *4000*.

Emails. Estas credenciales se obtienen del servicio que se utilizará como pasarela para despachar los correos:

- `MAIL_HOST`: Host. Si no se especifica el backend utiliza por defecto *localhost*.
- `MAIL_PORT`: Puerto. Si no se especifica el backend utiliza por defecto el *587*
- `MAIL_USER`: Nombre de usuario. Parámetro obligatorio.
- `MAIL_PASSWORD`: Contraseña del usuario de email. Parámetro obligatorio.

Modos ejecución del servidor. Establecer la variable `SERVER_MODE` en:

- `PRODUCTION`: Inicia el backend en modo productivo. No se elimina nada de la BD y solo se puebla con los datos básicos siempre y cuando la respectiva tabla a poblar se encuentre vacía.
- `DEV`: Inicia el backend en modo desarrollo. No se elimina nada de la BD y solo se puebla con los datos básicos  siempre y cuando la respectiva tabla a poblar se encuentre vacía.
- `DEV-CLEAN`: Inicia el backend en modo destructivo, destruyendo y reconstruyendo la BD en cada inicio y reinicio del server (se utiliza nodemon, por lo que si hace alguna modificación habrá un reinicio). Posterior a la reconstrucción puebla con datos básicos y fake. Requiere que el nombre de la BD tenga el sufijo `_test`.
- `TESTING`: Inicia el backend en modo testing, destruyendo y reconstruyendo la BD en cada inicio y reinicio del server (se utiliza nodemon, por lo que si hace alguna modificación habrá un reinicio), se puebla con datos básicos y de testing. Requiere que el nombre de la BD tenga el sufijo `_test`. Se recomienda crear una base de datos exclusiva para testing. El objetivo de este modo es ejecutar los test de integración y de regresión que requieren de base de datos y un endpoint graphql al cual consultar.

```
El framework, específicamente Sequelize, incluyen un chequeo de seguridad contra destrucciones
accidentales de base de datos. Es por ello que algunos modos requieren de una BD exclusiva y con sufijo "_test".
```
Mocking rápido:

Mocking rápido o más bien respuesta rápida del backend. Establecer la variable `FAST_MOCKING` a *true* para habilitar la respuesta del servidor graphql con datos falsos generados y **NO** ejecutar los resolutores, así como tampoco cargar los middlewares del usuario (ni los permisos). Establecer a *false* para responder con los resolutores.

Este modo **NO** debe ser utilizada cuando el `SERVER_MODE` está en **TESTING**, de lo contrario los test fallarán.

Como se mencionó en la sección *¿Cómo comenzar a utilizar esta plantilla?*, se recomienda crear dos versiones de este fichero, una para desarrollo y otra para testing. El fichero `.gitignore` (ubicado en la raíz del proyecto) incluye entrada dos entradas especialmente añadidas para este propósito: `start.sh` y `start-testing.sh`.

## Emails

El framework tiene la carpeta `mails` (ubicada en `src/`) para organizar las plantillas de email y sus originales.

¿Cómo se construye una plantilla de email?

Se recomienda utilizar la herramienta https://bootstrapemail.com para crear las plantillas utilizando la sintaxis de Bootstrap 4. La herramienta contiene un editor en línea https://bootstrapemail.com/editor que permite modificar y ver el resultado visual inmediatamente.
A grandes rasgos lo que hace *bootstrapemail* es leer el HTML escrito con la sintaxis de Bootstrap que ellos soportan (no todo está implementado) y luego procede a transpilar ese HTML en otro HTML que soporta una gran variedad de clientes de correo. Es por ello que nos referimos a *las fuentes* o *el original* al código HTML antes de transpilar y *la plantilla* para el HTML posterior a la transpilación.

Los *originales* son archivos HTML que se almacenan para ser versionados y no prestan utilidad alguna al backend. Su único fin es para reconstruir *la plantilla* y poder hacer modificaciones en el tiempo. Los emails son enviados desde los resolutores y estos solo requieren de *la plantilla*.

¿Cómo crear una plantilla?

Para crear una plantilla se debe ingresar al editor. Se puede iniciar desde cero o copiar y pegar el contenido de un *original* (el framework incluye varios). Una vez se tenga listo el email, proceder a *transpilar* estableciendo el switch **"Code <--> Preview"** en **Code**. Luego copiar y pegar todo el contenido dentro de un script JS.
Crear una función que retorne el HTML de la *plantilla* con su respectivo contenido.

## Plugins

El framework posee un sistema de plugins que permite reutilizar y extender funcionalidades ya creadas. Se ha diseñado el sistema teniendo como eje central la facilidad de adaptar un plugin al uso particular del negocio, mientras se mantiene una forma simple y rápida de instalación.

### Como instalar el plugin

Leer las instrucciones de instalación de cada plugin.

### Estructura

Los plugins contienen una estructura similar a las entidades (ubicadas en `src/entities`. Es más, el framework utiliza la misma tecnica para cargar los tipos, modelos, resolutores y permisos de las entidades y los plugins. Debido a ello se debe seguir la misma convención para organizar los plugins.

Un plugin esta organizado dentro del directorio principal `plugins` (ubicado en la raíz del framework) y dentro de este una carpeta `src` con todas sus fuentes. Por ejemplo, si se tiene el plugin `Region`, este estará organizado de la siguiente forma.

```
+-- plugins
|   +-- Region
|   |   +-- src
|   +-- Plugin2
|   |   +-- src
|   +-- Plugin3
|   |   +-- src
```

Y dentro la carpeta `Region/src`:

* `region.type.graphql`: Contiene las definiciones de GraphQL (tipos).
* `region.model.js`: Contiene el modelo.
* `region.resolvers.js`: Contiene los resolutores.
* `region.premissions.js`: Contiene los permisos. Usualmente las reglas de permisos que se utilizarán serán las mismas que se definan en el `src/shield` del proyecto, es por ello que los plugins sólo traen la estructura definida y comentada.
* `mocks/region.mocks.js`: Contiene los mocking rápidos.
* `data`: Contiene los datos base para la BD y funciones para poblar.
* `models`: Contiene el modelo. En desuso.

Además de las carpetas y scripts mencionados anteriormente un plugin puede establecer mas carpetas y scripts según requiera. Por ejemplo, un plugin que requiera cargar un middleware de express tendrá que definir la carpeta `src/middlewares`, de la misma forma si ofrece helpers `src/helpers` o reglas para shield `src/shield/rules.js`

### Plugins disponibles

* [Usuarios con JWT](https://bitbucket.org/ustart-chile/ustart-plugin-users/src)
* [Regiones de Chile](https://bitbucket.org/ustart-chile/ustart-plugin-regions/src)
* [Comunas de Chile](https://bitbucket.org/ustart-chile/ustart-plugin-region-comunas/src)
* [Parámetros configurables](https://bitbucket.org/ustart-chile/ustart-plugin-parameters/src)

## Primer Ejemplo: "Hello"

A continuación se muestra un paso a paso sobre cómo utilizar el framework. Crearemos un servidor graphql que permita establecer un nombre, obtener el objeto en memoria, saludar y suscribirse a saludar cada X segundos.

Crear la carpeta `Example` en `src/entities`
```bash
mkdir ./src/entities/Region
```

Crear los scripts de tipos y resolutores
```bash
touch ./src/entities/Region/example.type.graphql
touch ./src/entities/Region/example.resolvers.js
```

Abrir el archivo `example.type.graphql`, copiar y pegar:
```graphql

type Example {
  name: String
}

type Query {
  hello: String
  getExample: Example
}

type Mutation {
  setExample(name: String): Example
}

type Subscription {
  sayHelloEvery(seconds: Int!): String
}

```

Abrir el archivo `example.resolvers.js`, copiar y pegar:
```javascript

const exampleObject = {
  name: null
};

const exampleResolvers = {
  Query: {
    hello: (root, args) => {
      return !exampleObject.name
        ? "Hello, I don't know your name"
        : `Hello ${exampleObject.name}`;
    },
    getExample: (root, args) => {
      return exampleObject;
    },
  },
  Mutation: {
    setExample: (root, args, context) => {
      const { name } = args;

      exampleObject.name = !name ? null : name;

      return exampleObject;
    },
  },
  Subscription: {
    sayHelloEvery: {
      subscribe: (parent, args, { pubsub }) => {
        const { seconds } = args;
        const channel = Math.random().toString(36).substring(2, 15); // random channel name
        let count = 0;
        setInterval(() => pubsub.publish(channel, { sayHelloEvery: `Hello, count ${count++}` }), seconds * 1000);
        return pubsub.asyncIterator(channel);
      },
    }
  }
};

export default exampleResolvers;

```

Arrancar el servidor utilizando el script `start.sh`. Si no has creado este script debes leer la documentación.

```bash
./start.sh
```

Si todo ha salido bien ya debería tener una instancia de tu servidor ejecutandose en el puerto que especificaste dentro del script `start.sh`, por defecto es el 4000. Abre tu navegador y entra a `localhost:4000`. Se abrirá la playground, cuya interfaz está divida en dos columnas: a la izquierda podrás ejecutar tus queries y mutations; y la derecha muestra el resultado de estas ejecuciones.

Ejecutemos la query `hello`:
```graphql

query {
  hello
}

```
Presionas **PLAY** y el resultado debe ser:
```json
{
  "data": {
    "hello": "Hello, I don't know your name"
  },
}
```

Ahora estableceremos un nombre, para ello ejecutaremos la mutación `setExample` con el argumento `name` establecido a `Jhon Doe`:

```graphql
mutation {
  setExample (name: "Jhon Doe") {
    name
  }
}
```

Y el resultado debe ser:
```json
{
  "data": {
    "setExample": {
      "name": "Jhon Doe"
    }
  },
}
```

Repetimos la ejecución de la consulta `hello` y el resultado debería ser:
```json
{
  "data": {
    "hello": "Hello Jhon Doe"
  },
}
```

Revisemos la estructura que almacena el ejemplo ejecutando la consulta `getExample`:
```graphql
query {
  getExample {
    name
  }
}
```

Y el resultado debería ser:
```json
{
  "data": {
    "getExample": {
      "name": "Jhon Doe"
    }
  },
}
```

Puedes eliminar el registro estableciendo `name` a *null*:
```graphql
mutation {
  setExample (name: null) {
    name
  }
}
```

Vuelve a ejecutar la consulta `hello` y revisa el resultado!

Ahora continuaremos con la suscripción. Copia y pega el siguiente código en la playground:
```graphql
subscription {
  sayHelloEvery(seconds: 3)
}
```

Y el resultado debería ser:
```json
{
  "data": {
    "sayHelloEvery": "Hello: 0"
  }
}
-----
{
  "data": {
    "sayHelloEvery": "Hello: 1"
  }
}
-----
{
  "data": {
    "sayHelloEvery": "Hello: 2"
  }
}
-----
{
  "data": {
    "sayHelloEvery": "Hello: 3"
  }
}
```

El servidor seguirá enviando datos al cliente cada X segundos hasta que lo detengas.

Continuaremos con las directivas de esquema.

Se creará una directiva de esquema que transformará el nombre proporcionado por argumento (en este caso a la mutación) a mayúsculas previa ejecución del resolutor. El flujo es el siguiente, proporcionas un nombre en minúsculas, la directiva lo transforma a mayúsculas y luego se ejecuta el resolutor, al cual el nombre llega en mayúsculas.

El resolutor de la mutación tendrá la misma lógica que `setExample` (con el objetivo de demostrar el resultado de aplicar una directiva de esquema).

Y en la definición de la mutación se añadirá la directiva *@uppercase*.

Añadir al comienzo del archivo `example.type.graphql` la directiva:
```graphql
directive @uppercase on FIELD_DEFINITION
```

Dentro del mismo archivo y del tipo `Mutation`, añadir la mutación `setNameInUpperCase`:
```graphql
type Mutation {
  #...
  setNameInUpperCase(name: String!): Example @uppercase
  #...
}
```

Luego se debe implementar la mutación `setNameInUpperCase`, para ello añadir al resolutor y dentro del objeto `Mutation` lo siguiente:

```javascript
// ...rest of the code...
setNameInUpperCase: (root, args, context) => {
  const { name } = args;

  exampleObject.name = !name ? null : name;

  return exampleObject;
},
// ...rest of the code...
```

Como te habrás dado cuenta, la implementación de `setNameInUpperCase` es la misma que `setExample`.

Continuamos con la creación de la implementación de la directiva `uppercase`. Para ello crear el script `UpperCaseDirective.js` en la carpeta `src/directives` y pegar el siguiente código:
```javascript
import { SchemaDirectiveVisitor } from "graphql-tools";

export default class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = function (...args) {
      const { name } = args[1];
      args[1] = { name: name.toUpperCase() };
      return resolve.apply(this, args);
    };
  }
}
```

Una vez implementada la directiva, esta debe ser importada y añadida al objeto `schemaDirectives` ubicado en `src/directives/index.js`:
```javascript
import UpperCaseDirective from "./UpperCaseDirective"; // Add this line

const schemaDirectives = {
  uppercase: UpperCaseDirective // Add this line
};

export { schemaDirectives }; // Uncomment this line
```

Con esto ya podrás probar la mutación. Para ello copia y pega en la playground lo siguiente:
```graphqL
mutation {
  setNameInUpperCase (name: "jhon") {
    name
  }
}
```

El resultado debería ser:
```json
{
  "data": {
    "setNameInUpperCase": {
      "name": "JHON"
    }
  },
}
```

Puedes ejecutar la query `hello` y debería responder con:
```json
{
  "data": {
    "hello": "Hello JHON"
  },
}
```

## Segundo Ejemplo con MongoDB: "Person"

A continuación se muestra un ejemplo sobre como conectra una instancia MongoBD. Se puede continuar con el ejemplo anterior.

Abrir el archivo `datasources.js` en `src/data` y añadir la conexión a MongoDB:
```javascript
ustart.connect(process.env.MONGO_URI, { useNewUrlParser: true });
```

Abrirl el script de arranque `start.sh` o `start-testing.sh` y añadir la conexión a tu BD:
```bash
MONGO_URI="mongodb://127.0.0.1:27017/example_test"

# Se arranca el servidor
MONGO_URI=$MONGO_URI ...
```

Crear la carpeta `Person` en `src/entities`
```bash
mkdir ./src/entities/Person
```

Crear los scripts de tipos, modelo y resolutores
```bash
touch ./src/entities/Person/person.type.graphql
touch ./src/entities/Person/person.model.js
touch ./src/entities/Person/person.resolvers.js
```

Abrir el archivo `person.type.graphql`, copiar y pegar:
```graphql
type Person {
  _id: String
  name: String
  age: Int
}

type Query {
  person(_id: String): Person
}

type Mutation {
  createPerson(name: String, age: Int): Person
}
```

Abrir el archivo `person.model.js`, copiar y pegar:
```javascript
import { Schema } from "mongoose";
import { ustart } from "../../../server/connectors/ustart";

ustart.defineModel("mongodb", "person", new Schema({
  name: String,
  age: Number
}));
```

Abrir el archivo `person.resolvers.js`, copiar y pegar:
```javascript
const personResolvers = {
  Query: {
    person: (root, args, { ustart }) => {
      return ustart.models.person.findOne({ _id: args._id });
    },
  },
  Mutation: {
    createPerson: (root, args, { ustart }) => {
      return ustart.models.person.create(args);
    },
  },
};

export default personResolvers;
```

Ahora a probar el endpoint!

Registramos una persona:

```graphql
mutation {
  createPerson(
    name: "Jhon doe",
    age: 54
  ) {
    _id,
    name,
    age
  }
}
```

Consultamos los datos de la misma persona, para ellos copiamos el atributo `_id` del resultado anterior:

```graphql
query {
  person(_id: "COPIAR_Y_PEGAR_EL_ID") {
    _id,
    name,
    age
  }
}
```
