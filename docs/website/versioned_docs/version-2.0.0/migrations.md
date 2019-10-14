---
id: version-2.0.0-migrations
title: Migrations
original_id: migrations
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
* Create or update `_current.json` which is used to calculate the differences between models the next time you generate a migration.
* Create or update `_current_bak.json` which is used to calculate the differences between models the next time you generate a migration. This file is created in the second execution.

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

Before start remember that you have to:

* Install the database drivers.
* Add the database URL to the `.env` file.
* Disable database sync and enable the migration at `datasources.js`.

For the follow type:
```graphql
# file: src/entities/Animal/animal.type.graphql
type Animal {
  id: Int
  name: String
  age: Int
  category: String
}

type Query {
  # Returns an animal by its ID
  getAnimal(id: Int!): Animal

  # Returns a list of animals that matches name
  getAnimalsByName(name: String!): [Animal]
}

type Mutation {
  # Register one animal and returns the record
  addAnimal(
    name: String,
    age: Int,
    category: String
  ): Animal
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

The command output:

```shell
# ...build process output...

[Actions] createTable "animals", deps: []
New migration to revision 1 has been saved to file 'FULL-PATH-TO-YOUR-PROJECT/animals-example/migrations/1-initial-migration.js'
```

Two files were created in the migrations folder:

* `_current.json` [explained previosly](migrations.md#creating-a-migration-autogenerate).
* `1-initial-migrations.js` is your migration, let's look inside it:

```js
'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "animals", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial-migration",
    "created": "2019-09-05T16:06:48.678Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "animals",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "name": {
                "type": Sequelize.STRING(10),
                "field": "name"
            },
            "age": {
                "type": Sequelize.INTEGER,
                "field": "age"
            },
            "category": {
                "type": Sequelize.STRING(20),
                "field": "category"
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
```

Go on and run the migration (make sure the database does not have the table).

```shell
npx ustart db:migrate
```

The command output:

```shell
Sequelize CLI [Node: 8.9.4, CLI: 5.5.1, ORM: 5.18.1]

Parsed url postgres://localhost:5432/animals-example
File: _current.json does not match pattern: /\.js$/
File: _current.json does not match pattern: /\.js$/
File: _current.json does not match pattern: /\.js$/
== 1-initial-migration: migrating =======
[#0] execute: createTable
== 1-initial-migration: migrated (0.881s)
```

You can ignore the lines about `_current.json`.

Look at your database, the table `animals` with its four attributes must be there along with `SequelizeMeta`.

![Table list for version 1](assets/migrations-show-tables-version-1.png)

Now, for our version 2.0 we are going to add a field: `size` of type string.

First, add it in the graphql type:

```graphql
# file: src/entities/Animal/animal.type.graphql
type Animal {
  id: Int
  name: String
  age: Int
  category: String
  size: String # <-- new field
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
  size: { type: Sequelize.STRING(20) } // <-- new field!
}, {
  timestamps: false
});
```

Then create the migration file:

```shell
npx ustart migration:autogenerate --name "animal-add-column-size"
```

The command output:

```js
# ...build process output...
[Actions] addColumn "size" to table "animals"
New migration to revision 2 has been saved to file 'FULL-PATH-TO-YOUR-PROJECT/animals-example/migrations/2-animal-add-column-size.js'
````

Two files were created in the migrations folder:

* `_current_back.json` [explained previosly](migrations.md#creating-a-migration-autogenerate).
* `2-animal-add-column-size.js` is your second migration, let's look inside it:

```js
'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "size" to table "animals"
 *
 **/

var info = {
    "revision": 2,
    "name": "animal-add-column-size",
    "created": "2019-09-05T17:52:52.869Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "animals",
        "size",
        {
            "type": Sequelize.STRING(20),
            "field": "size"
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

```

Go on and run the migration:

```shell
npx ustart db:migrate
```

The command output:

```js
Sequelize CLI [Node: 8.9.4, CLI: 5.5.1, ORM: 5.18.1]

Parsed url postgres://localhost:5432/animals-example
File: _current.json does not match pattern: /\.js$/
File: _current_bak.json does not match pattern: /\.js$/
File: _current.json does not match pattern: /\.js$/
File: _current_bak.json does not match pattern: /\.js$/
File: _current.json does not match pattern: /\.js$/
File: _current_bak.json does not match pattern: /\.js$/
== 2-animal-add-column-size: migrating =======
[#0] execute: addColumn
== 2-animal-add-column-size: migrated (0.178s)
```

You can ignore the lines about `_current.json` and `_current_bak.json`.

The follow image shows both migrations record and the new `size` column of table `animals`:

![Table list for version 2](assets/migrations-show-tables-version-2.png)

If your database matches the image, congratulations then, you have done your first migrations flow!.
