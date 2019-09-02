---
id: version-1.0.0-models
title: Models
original_id: models
---

Models represents tables or collections from a database and they provide with read and write operations.

## Define a model

Models must placed on entities directory and its name must have the suffix `model.js`. As shown in the [First Example (part 2)](first-example-2.md#define-a-model), if you have a `Dog` entity, then your model name must be `dog.model.js`. uStart searches and loads all models from entities folder.

To define a model, uStart provides the method `ustart.defineModel(datasource, modelName, modelInstance, options)`, were:

* `datasource`: It is the database were the model is going to be instantiate, it can be:
  * mariadb
  * postgres
  * mongodb
* `modelName`: It is your model name. It must be unique across datasources.
* `modelInstance`: If datasource is mariadb or postgres, then you have to follow Sequelize style for defining a model, under the hood uStart will call `Sequelize.define()` and pass directly `modelName`, `modelInstance` and `options`. On the other hand, if the datasource is mongodb, then you have to use Mongoose style, uStart will call `Mongoose.model()` for you with `modelName`, `modelInstance` and `options`.
* `options`: options value depends on which datasource you use.

Every defined model is merged into `ustart.models` attribute. If you define `dog` model, it will be available at `ustart.models.dog`.

> GraphQL types and models are tightly correlated, usually both will have the same fields.

## Using a model

uStart adds an instance of `ustart` class to the application context. You can easily access to it throught resolver's third argument:

```js
getUser: (root, args, context) => {
  const { id } = args;
  const { ustart } = context;

  return ...
},
```

Depending on which datasource you use (Sequelize or Mongoose), your model will have different methods, properties and options.

For Sequelize:

```js
return ustart.models.user.findByPk(id); // sequelize
```

Find the complete list of models methods [here](http://docs.sequelizejs.com/manual/models-usage.html).

For Mongoose:

```js
return ustart.models.user.findOne({ _id: args.id }); // mongoose
```

Find the complete list of models methods [here](https://mongoosejs.com/docs/models.html).

## Add associations

> This section is only for Sequelize.

You can define your associations in the `src/models/associations.js` file:

```js
import { ustart } from "ustart";

const {
  user,
  region
} = ustart.models;

user.belongsTo(region);
region.hasMany(user);
```

Use the same methods provided by Sequelize:

* BelongsTo
* HasOne
* HasMany
* BelongsToMany

More details about associations [here](http://docs.sequelizejs.com/manual/associations.html).

## Example

In the follow example there is a `User` entity with three attributes: *id*, *name* and *email*.

The type file (`src/entities/User/user.type.graphql`) is the follow:

```graphql
type User {
  id: Int # 'id' for Sequelize, '_id' for Mongoose
  name: String
  email: String
}
```

Using Sequelize and Postgres its model (`src/entities/User/user.model.js`) is:

```js
import Sequelize from "sequelize";
import { ustart } from "ustart";

ustart.defineModel("postgres", "user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING(20) },
  email: { type: Sequelize.STRING }
}, {
  timestamps: false
});
```

> You can see that the `modelInstance` (third argument) is just a typical Sequelize model definition.

More details about Sequelize models definition [here](http://docs.sequelizejs.com/manual/models-definition.html).

Using Mongoose its model (`src/entities/User/user.model.js`) is:

```js
import { Schema } from "mongoose";
import { ustart } from "ustart";

ustart.defineModel("mongodb", "user", new Schema({
  name: String,
  email: Number
}));
```

Again, the `modelInstance` argument (third) is just a typical Mogoose schema.

> Mongoose assigns each of your schemas an \_id field by default if one is not passed into the Schema constructor.

More details about Mongoose models definition [here](https://mongoosejs.com/docs/guide.html).
