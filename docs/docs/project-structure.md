---
id: project-structure
title: Project Structure
---

uStart follows name conventions to make development easier and faster.

## Directory Structure

After you have initialized a project with `npx ustart-cli init`, it will create a directory structure with the follow:

```
+-- __tests__/
|   +-- hello.test.js
|   +-- utils.js
+-- config/
|   +-- datasources.js
|   +-- jestSetup.js
|   +-- yoga.js
+-- src/
|   +-- data/
|   |   +-- base/
|   |   +-- basicDataMocking.js
|   |   +-- fakeDataMocking.js
|   |   +-- testingMocking.js
|   +-- directives/
|   +-- entities/
|   +-- helpers/
|   +-- middlewares/
|   |   +-- express.js
|   |   +-- graphql.js
|   +-- models/
|   |   +--associations.js
|   +-- shield/
|   |   +-- options.js
|   |   +-- rules.js
|   +-- subscription/
|   +-- .babelrc
|   +-- .env
```

## Directory and Files Description

* **__tests__**: Place your tests here. `hello.test.js` contains an example using Jest.
* **config**: Contains configuration files for [datasources](datasources.md), [Jest](https://jestjs.io/docs/en/22.x/getting-started.html) and [graphql-yoga options](https://github.com/prisma/graphql-yoga#startoptions-options-callback-options-options--void----null-promisevoid)
* **src/data**: Contains the database seeds for different environments. It also defines the endpoints for connecting datasources. Use the scripts `basicDataMocking`, `fakeDataMocking` and `testingMocking` with cautious, they are temporary solution while we implement the uStart datamodel generator and we are not sure if they will be kept on next releases.
* **src/directives**: Schema directives.
* **src/entities**: Contains the graphql schemas (types), resolvers, database models, permissions and mocking.
* **src/middlewares**: Contains the middlewares to be loaded by uStart. `express.js` defines the express middlewares to be passed to `graphql-yoga` server (by default includes cors y compression). `graphql.js` defines the resolver middlewares, it uses `graphql-middleware` package.
* **src/models**: `associations.js` establishes the Sequelize associations.
* **src/shield**: `options.js` defines the `graphql-shield` options. Use `rules.js` to implement your shield rules.
* **src/subscription**: Contains the subscription instance.


## .env

Use it to define your own environment variables. It is also used by uStart, the framework options are:

* **NODE_ENV**: `development`, `testing`, `dev-clean` and `production`.
* **GRAPHQL_ENDPOINT_PORT**: Port to listen. default `4000`.
* **FAST_MOCKING**: By default it value is `false`. When is set to `true`, uStart will respond with the mocking files located in every entity instead of using the resolver script. Use it for fast prototype.
* **PG_URI**: URI to PostgreSQL. This name is not mandatory, you can change it for another one.
* **MYSQL_URI**: URI to MySQL. This name is not mandatory, you can change it for another one.
* **MONGO_URI**: URI to MongoDB. This name is not mandatory, you can change it for another one.
* **MAIL_URL**: It should reference an SMTP server and use the form `smtp://USERNAME:PASSWORD@HOST:PORT` or `smtps://USERNAME:PASSWORD@HOST:PORT`. See [Email](email.md) section.
