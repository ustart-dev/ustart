---
id: version-2.0.0-datasources
title: Datasources
original_id: datasources
---

uStart was designed to easily connect with multiple data sources.

## Connection

Use `ustart.connect()` method into `config/datasources.js` script to specify your connections.

```js
import { ustart } from "ustart";

ustart.connect(URI, options, ustartOptions);
```

Define **URI** as environmental variable inside the `.env` file:

```bash
URI="[datasource]://user:pass@example.com:[port]/[dbname]"
```

That is the minimum you have to do in your code to establish a connection.

The second argument `options` is passed as is to the underlying library: *Sequelize* or *Mongoose*.

The third argument `ustartOptions` allows you to customize the behavior of the datasource managed by uStart class. At the moment the only option supported is `enableMigration` that allows you to enable the migration for the datasource. Read more about it on [Migrations](migrations.md) section.

## Relational Databases

uStart uses [Sequelize v5](http://docs.sequelizejs.com/) to connect with RDBMS. Sequelize is a promise-based Node.js ORM that supports 5 databases: Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

At the moment, uStart can use PostgreSQL and MariaDB databases. Support for MySQL, SQLite and Microsoft SQL Server will be added in follow updates.

To establish a connection, you have to install manually the driver for the database of your choice:

```bash
npm install --save pg pg-hstore
npm install --save mariadb
```

> You don't have to install Sequelize, it is installed by default when you executed `npx ustart-cli init`.

Inside `config/datasources.js` define your connections (you can use more than one):

```js
import { ustart } from "ustart";

ustart.connect(process.env.PG_URI);
ustart.connect(process.env.MARIADB_URI);
```

Add the endpoints into `.env` file:

```bash
PG_URI="postgres://user:pass@example.com:5432/dbname"
MARIADB_URI="mariadb://user:password@example.com:9821/database"
```
> Note that `PG_URI` and  `MARIADB_URI` are just recommended names, use whatever you need.

More info about **URI** format on [Sequelize dialects](http://docs.sequelizejs.com/manual/usage.html#dialects).

## NoSQL

uStart uses [Mongoose v5](https://mongoosejs.com) to connect to [MongoDB](https://www.mongodb.com/). Mongoose is installed by default and no extra driver is needed.

```js
import { ustart } from "ustart";

ustart.connect(process.env.MONGO_URI, { useNewUrlParser: true });
```

in your `.env` file:

```bash
MONGO_URI="mongodb://username:password@host:port/database?options..."
```

> Note that `MONGO_URI` is just recommended name, use whatever.

More info about **URI** format on [Mongoose connections](https://mongoosejs.com/docs/connections.html).
