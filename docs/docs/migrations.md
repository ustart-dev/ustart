---
id: migrations
title: Migrations
---

Migrations allows you to keep track of changes to the database. With migrations you can transfer your existing database into another state: Those state transitions are saved in migration files, which describe how to get to the new state.

## Database sync

While developing, it is probably that you create models and attributes fast. You want to focus on the business logic behind your resolvers and graphql types rather than scripting and managing your database.

uStart datasources and models supports database sync, thanks to Sequelize. This option is enabled by default and it is responsable that you did not have to create any table in your database in the [First example (part 2)](first-example-2.md).

However, in **production**, this behavior is not recommended. Migrations are intended to solve this problem.

Disable database sync by using `setSync(true|false)` method from `ustart` class. In `config/datasources.js` add:

```js
ustart.setSync(false);
```

> To prevent accidents, only databases which names end with `_test` can be deleted by sync option. This works as a safety check to prevent you destroying your data!

## How it works

uStart use three libraries to manage migrations: Sequelize to connect with the database, Sequelize-cli to run migrations and a forked version of [Sequelize-auto-migrations](https://github.com/ustart-dev/sequelize-auto-migrations) to autogenerate migrations. The later is mantained by our team and is responsable for all the magic behind *autogenerate*.

## General process

**Developing**, the process of using migrations is the follow:

1. Add new models or modify existing ones by adding/removing relations or attributes.
1. While developing use `ustart.setSync(true)` to forget about database modifications. Of course this applies only to routine modifications. If you need to perform complex operations it is better use another way.
1. Once you are ready, disable database sync and create the migration file.
1. Destroy the database, recreate it by running all migrations.
1. Make sure that everything works.

**In production**, the process of applying migrations is the follow:

1. Deploy your app.
1. Make sure that *NODE_ENV* is set to *production*.
1. Run your migrations.
1. Make sure that everything has gone well.

## The CLI

The CLI provides two commands to work with migrations:

1. `ustart migration:autogenerate --name "migrations-name"` to autogenerate migrations base on models.
2. `ustart db:migrate` to run all pending migrations.

> Migrations are only supported for Sequelize models.

## Structure

Migrations are stored in `migrations` folder at the root of your project. You have to create it before running `ustart migration:autogenerate` command. Otherwise an error will raise requesting you to initialize the folder using `sequelize init` (**don't do it**).

After creating the folder, your project structure should looks like:
```ascii
+-- your-project
|   +-- __tests__
|   +-- config
|   +-- dist
|   +-- migrations   <-- new folder
|   +-- src
```

## Enabling migrations

Only one datasource at a time can have migrations enabled. This is done using the third argument of `ustart.connect()` into `config/datasources.js` as follow:

```js
ustart.connect(URI, options, ustartOptions);
```

For example:

```js
ustart.connect(
  process.env.PG_URI,
  null,
  { enableMigration: true }
);
```

> If you enable migrations for more than one datasource only the last one will be considered.

## Creating a migration (autogenerate)

Once you have created the migrations folder and enabled migration for a datasource you are ready to create your first migration. Remember that you need to have an entity with a model.

Use the command `npx ustart migration:autogenerate --name "migration-name"` to create a new migration that matches your models definitions across entities (only works with the same datasource). It will calculate the difference from its last ran and create a migration file that transfer the database state to its current form.

The migration command will do following:
* Build your project src into dist
* Create a migration file with name like `XX-migration-name.js`

## Create a migration manually

The migrations file format is fully compatible with Sequelize. You can create your own migrations file by using the skeleton:

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
  }
}
```

More about this on [Sequelize documentation](https://sequelize.org/master/manual/migrations.html#migration-skeleton).

> Keep in mind that going manually will break the auto generated process. Be caution: use it completely or stay away from it.

## Running migrations

Use `npx ustart db:migrate` to run all pending migrations. This command queries the table `SequelizeMeta` to see the last migration executed and run all migrations from that point.

Every migration ran is saved in `SequelizeMeta` table to keep track of what as been done.

> At the moment is not possible to change the table's name.

## Limitations

Migrations are in alpha stage, use them with caution and always review the result.

Below there is the list of current limitations:

* Works using Sequelize v4. Migration to v5 is being developed.
* No support for down method in the auto generated.
* Issues with some field types.
* Issues with too many relations.

More about it in the repo: [Sequelize-auto-migrations](https://github.com/ustart-dev/sequelize-auto-migrations#todo).

## Example

To illustrate how you should use migrations, lets use the *Animal* example shown in [Resolvers, using resolvers](resolvers.md#using-resolvers) section. For shortening the example, the resolver is omitted.

For the follow type (omiting *query* and *mutation*):
```graphql
# file: src/entities/Animal/animal.type.graphql
type Animal {
  id: Int
  name: String
  age: Int
  category: String
}
```

We can use this model:

```js
// file: src/entities/Animal/animal.model.js
import Sequelize from "sequelize";
import { ustart } from "ustart";

ustart.defineModel("postgres", "animal", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING(10) },
  age: { type: Sequelize.INTEGER },
  category: { type: Sequelize.STRING(20) }
}, {
  timestamps: false
});
```

The above model is our version 1.0. Let's create the initial migration:

```shell
npx ustart migration:autogenerate --name "initial-migration"
```

[TODO: ADD COMMAND OUTPUT]

Go on and run the migration (make sure the database does not have the table).

```shell
npx ustart db:migrate
```

[TODO: ADD COMMAND OUTPUT]

Look at your database, the table `animals` with its four attributes must be there.

Now, for our version 2.0 we are going to add a field: `size` of string type.

First, add it in the graphql type:

```graphql
# file: src/entities/Animal/animal.type.graphql
type Animal {
  id: Int
  name: String
  age: Int
  category: String
  size: String # new field
}
```

Now at the model:

```js
// file: src/entities/Animal/animal.model.js
import Sequelize from "sequelize";
import { ustart } from "ustart";

ustart.defineModel("postgres", "animal", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING(10) },
  age: { type: Sequelize.INTEGER },
  category: { type: Sequelize.STRING(20) },
  size: { type: Sequelize.STRING(20) } // New field!
}, {
  timestamps: false
});
```

Then create the migration file:

```shell
npx ustart migration:autogenerate --name "animal-add-column-size"
```

[TODO: ADD COMMAND OUTPUT]

Go on and run the migration.

```shell
npx ustart db:migrate
```

[TODO: ADD COMMAND OUTPUT]

Look at your database, if it matches the last model's version then congratulations, you have your first migrations flow done!.
