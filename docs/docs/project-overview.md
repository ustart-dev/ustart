---
id: project-overview
title: Project Overview
---

uStart is ship with a project structure, libraries and tools integrated, and name conventions to make development easier, faster and standard.

After you have initialize a project with `npx ustart-cli init`, you are going to have several parts configured for you.

## Project Structure

After you have initialized a project with `npx ustart-cli init`, it will create a directory structure with the follow:

```
+-- __tests__/
|   +-- hello.test.js
|   +-- utils.js
|
+-- config/
|   +-- datasources.js
|   +-- jestSetup.js
|   +-- yoga.js
|
+-- src/
|   +-- data/
|   |   +-- base/
|   |   +-- basicDataMocking.js
|   |   +-- fakeDataMocking.js
|   |   +-- testingMocking.js
|   |
|   +-- directives/
|   +-- entities/
|   +-- helpers/
|   +-- middlewares/
|   |   +-- express.js
|   |   +-- graphql.js
|   |
|   +-- models/
|   |   +--associations.js
|   |
|   +-- plugins/
|   +-- shield/
|   |   +-- options.js
|   |   +-- rules.js
|   |
|   +-- subscription/
|
+-- .babelrc
+-- .dockerignore
+-- .env
+-- .eslintignore
+-- .gitignore
+-- .prettierignore
+-- docker-compose.builder.yml
+-- docker-compose.yml
+-- Dockerfile
```

## Directory and Files Description

* **__tests__**: Place your tests here. `hello.test.js` contains an example using Jest.
* **config**: Contains configuration files for [datasources](datasources.md), [Jest](https://jestjs.io/docs/en/22.x/getting-started.html) and [graphql-yoga options](https://github.com/prisma/graphql-yoga#startoptions-options-callback-options-options--void----null-promisevoid)
* **src/data**: Contains the database seeds for different environments. It also defines the endpoints for connecting datasources. Use the scripts `basicDataMocking`, `fakeDataMocking` and `testingMocking` with cautious, they are temporary solution while we implement the uStart datamodel generator and we are not sure if they will be kept on next releases.
* **src/directives**: Schema directives.
* **src/entities**: Contains the graphql schemas (types), resolvers, database models, permissions and mocking.
* **src/middlewares**: Contains the middlewares to be loaded by uStart. `express.js` defines the express middlewares to be passed to `graphql-yoga` server (by default includes cors y compression). `graphql.js` defines the resolver middlewares, it uses `graphql-middleware` package.
* **src/models**: `associations.js` establishes the Sequelize associations.
* **src/plugins**: Plugins folder.
* **src/shield**: `options.js` defines the `graphql-shield` options. Use `rules.js` to implement your shield rules.
* **src/subscription**: Contains the subscription instance.


## .env

Use it to define your own environment variables. It is also used by uStart, the framework options are:

* **NODE_ENV**: `development`, `test`, `dev-clean` and `production`.
* **PORT**: Port to listen. default `4000`.
* **FAST_MOCKING**: By default it value is `false`. When is set to `true`, uStart will respond with the mocking files located in every entity instead of using the resolver script. Use it for fast prototype.
* **PG_URI**: URI to PostgreSQL. This name is not mandatory, you can change it for another one.
* **MYSQL_URI**: URI to MySQL. This name is not mandatory, you can change it for another one.
* **MONGO_URI**: URI to MongoDB. This name is not mandatory, you can change it for another one.
* **MAIL_URL**: It should reference an SMTP server and use the form `smtp://USERNAME:PASSWORD@HOST:PORT` or `smtps://USERNAME:PASSWORD@HOST:PORT`. See [Email](email.md) section.

## Libraries and tools

Several JS libraries and tools are already part of uStart. If you look at `dependencies` and `devDependencies` of the generated `package.json` you will find the follow:

**dependencies**

- ustart: uStart core package
- ustart-cli: uStart CLI
- ustart-scripts: Scripts and project templates used at init fase.

**devDependencies**

- babel-cli
- babel-preset-env
- babel-preset-stage-3
- concurrently
- graphql-request
- husky
- jest
- lint-staged
- nodemon
- prettier-standard

And if you choose to, these packages will also be added as *dependencies* in the `init` command:

- @ustart/sequelize-auto-migrations
- graphql-shield
- mongoose
- sequelize
- sequelize-cli

## Scripts

The `package.json` contains a set of scripts intended to help you develop, build, test, format, among other things, your project:

* `clean`: Cleans the `dist` folder at the root of your project.
* `build`: Build the project for production.
* `build:dev`: Build the project for development.
* `start`: Start the app for development.
* `serve`: Serves the app for production.
* `test`: Test your project using *Jest*.
* `format`: Format the code to ensure readability and code quality using [prettier-standard](https://github.com/sheerun/prettier-standard) package.

Two entries are also included but they **should not** be executed directly:

* `watch-src`: Start babel to watch the *src* folder.
* `watch-node`: Start nodemon to watch the *dist* folder.

Both of them are used as part of *start* command: `npm start`.

More information about the build process on [Build & Deploy](build-deploy.md) section.

## Code quality

To ensure code quality, your project is already configured to provide **linting** and **formatting** using the packages [husky](https://www.npmjs.com/package/husky), [lint-staged](https://www.npmjs.com/package/lint-staged) and [prettier-standard](https://github.com/sheerun/prettier-standard).

To format your code base just run the script `npm run format`. To ensure you don't forget run it, we have added a hook that is executed before git commit, see "husky" entry at your `package.json`.
