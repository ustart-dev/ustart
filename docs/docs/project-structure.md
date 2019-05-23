---
id: project-structure
title: Project Structure
---

uStart follows name conventions to make development easier and faster.

## Directory Structure

After you have initialized a project with `ustart init`, it will create a directory structure with the follow:

```
+-- config
|   +-- jestSetup.js
+-- src
|   +-- config
|   |   +-- yoga.js
|   +-- data
|   |   +-- base
|   |   +-- basicDataMocking.js
|   |   +-- datasources.js
|   |   +-- fakeDataMocking.js
|   |   +-- testingMocking.js
|   +-- directives
|   +-- entities
|   +-- helpers
|   +-- middlewares
|   |   +-- express.js
|   |   +-- graphql.js
|   +-- models
|   |   +--associations.js
|   +-- shield
|   |   +-- options.js
|   |   +-- rules.js
|   +-- subscription
|   +-- .babelrc
|   +-- .env
```

## Directory and Files Description

* **data**: Contains the database seeds for different environments. It also defines the endpoints for connecting datasources. Use the scripts `basicDataMocking`, `fakeDataMocking` and `testingMocking` with cautious, they are temporary solution while we implement the uStart datamodel generator and we are not sure if they will be kept on next releases.
* **directives**: Schema directives.
* **entities**: Contains the graphql schemas (types), resolvers, database models, permissions and mocking.
* **middlewares**: Contains the middlewares to be loaded by uStart. `express.js` defines the express middlewares to be passed to `graphql-yoga` server (by default includes cors y compression). `graphql.js` defines the resolver middlewares, it uses `graphql-middleware` package.
* **models**: `associations.js` establishes the Sequelize associations.
* **shield**: `options.js` defines the `graphql-shield` options. Use `rules.js` to implement your shield rules.
* **subscription**: Contains the subscription instance.


## .env

Use it to define your own environment variables. It is also used by uStart, the framework options are:

* **NODE_ENV**: `development`, `testing`, `dev-clean` and `production`.
* **GRAPHQL_ENDPOINT_PORT**: Port to listen. default `4000`.
* **FAST_MOCKING**: By default it value is `false`. When is set to `true`, uStart will respond with the mocking files located in every entity instead of using the resolver script. Use it for fast prototype.
* **PG_URI**: URI to PostgreSQL. This name is not mandatory, you can change it for another one.
* **MYSQL_URI**: URI to MySQL. This name is not mandatory, you can change it for another one.
* **MONGO_URI**: URI to MongoDB. This name is not mandatory, you can change it for another one.
* **MAIL_URL**: It should reference an SMTP server and use the form `smtp://USERNAME:PASSWORD@HOST:PORT` or `smtps://USERNAME:PASSWORD@HOST:PORT`. See [Email](email.md) section.
