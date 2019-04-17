---
id: first-example-2
title: First Example (part 2)
---

Let's continue with the `Dog` example by adding a [Datasource](datasources.md). We are going to replace the array were we stored the dogs for a table in **PostgreSQL**.

## Requirements

Install PostgreSQL engine in your system, if you don't have already.
You also need to install the PostgreSQL node drivers.

Move to the root of your project and execute:

```bash
npm install pg pg-hstore
```

uStart uses Sequelize 5 to connect with relational databases and it is installed by default when you executed `ustart init`.

Now go to PostgreSQL (using whatever you use to manage it) and create a database. The database name must end with *\_test*. It is a name convention explained in [Datasources](datasources.md) section. In this example we will use **awesome-example_test**.

## Connect to PostgreSQL

To connect to PostgreSQL, open the script `src/data/datasources.js` and paste:

```js
import { ustart } from "ustart";

ustart.connect(process.env.PG_URI);
```

uStart uses a `.env` file to configure the environment. It is located at the root of your project, open it and append the database info as follow:

```bash
PG_URI="postgres://user:pass@example.com:5432/dbname"
```

Replace the attributes with your values.

For our example, which is running at localhost without user and password:
```bash
PG_URI="postgres://localhost:5432/awesome-example_test"
```

To verify the connection start the server:

```bash
npm start
```

Once it is ready you should see an output like this:

```bash
...
Executing (default): SELECT 1+1 AS result
```

## Define a Model

We have to define a model that represents the `Dog` table. It will also provide us with write and read operations. uStart have the `defineModel` method to do this task and it accepts three arguments: *datasource*, *model name* and *options*. More details on [Models](models.md) section.

All models are organized by entity and must have the suffix `.model.js` (a name convention), this way uStart will located it and load it automatically. Create the model `dog.model.js` at `Dog` entity:

```bash
touch ./src/entities/Dog/dog.model.js
```

and paste:

```js
import Sequelize from "sequelize";
import { ustart } from "ustart";

ustart.defineModel("postgres", "dog", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING(10) },
  age: { type: Sequelize.INTEGER }
}, {
  timestamps: false
});
```

If you have followed the [Part 1](first-example-1) of this example, you should remember that **Dog** has three attributes: *id*, *name* and *age*. Here, we are telling to the framework that our *Dog* entity will have those three attributes in the database too. Sequelize have the ability to sync your database schema to match your models, this option is enabled by default by uStart. Thus, if you have leaved the server running you will see that Sequelize has already synchronized your database, otherwise start it with `npm start`.

In both cases you will find an output like this:

```bash
...
Executing (default): CREATE TABLE IF NOT EXISTS "dogs" ("id"  SERIAL , "name" VARCHAR(10), "age" INTEGER, PRIMARY KEY ("id"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'dogs' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
```

**Note**: Sequelize applies pluralization to database names, transforming `dog` to `dogs` as table name. This will not affect your model's name.

All models are available at `ustart.models` attribute, so be aware that model names must be unique across your app.

## Adjusting the resolver

To use our fancy new model, we just have to adjust the resolver to use it instead of the previous array. uStart adds an instance to the application context, all you have to do is to access to `ustart` in the context argument of a resolver (located in the third position).

The *getDog* query:

```js
getDog: (root, args) => {
  const { id } = args;

  return dogList.find(e => e.id == id);
},
```

is transformed to:

```js
getDog: (root, args, context) => {
  const { id } = args;
  const { ustart } = context;

  return ustart.models.dog.findByPk(id);
},
```

Go on and modify the entire resolver, or you can paste the code:

```js
const dogResolvers = {
  Query: {
    getDog: (root, args, { ustart }) => {
      return ustart.models.dog.findByPk(args.id);
    },
  },
  Mutation: {
    newDog: (root, args, { ustart }) => {
      return ustart.models.dog.create({ name: args.name, age: args.age });
    },
  },
};

export default dogResolvers;
```

## Try out

We start by executing `getDog` query (paste it on the playground):

```graphql
query {
  getDog(id: 1) {
    name,
    age
  }
}
```

Press **PLAY** and the result must be:
```json
{
  "data": {
    "getDog": null
  }
}
```

There is no dog yet, so we don't expect any data. Let's go and register a dog:

```graphql
mutation {
  newDog (name: "Vito", age: 3) {
    id,
    name,
    age
  }
}
```

It should return:
```json
{
  "data": {
    "newDog": {
      "id": 1,
      "name": "Vito",
      "age": 3
    }
  }
}
```

If you look at your terminal you will see both SQL statements: *SELECT* and *INSERT*:
```bash
Executing (default): SELECT "id", "name", "age" FROM "dogs" AS "dog" WHERE "dog"."id" = 1;
Executing (default): INSERT INTO "dogs" ("id","name","age") VALUES (DEFAULT,$1,$2) RETURNING *;
```

We re-run `getDog` and it should return:
```json
{
  "data": {
    "getDog": {
      "name": "Vito",
      "age": 3
    }
  }
}
```

If you did your homework and implemented the `getAllDogs` query, you can make it work now by using the `findAll()` method from the `dog` model.
