---
id: resolvers
title: Resolvers
---

Resolvers are the core of your backend implementation. It is where you add most of your business logic. You will use them to connect with databases, caches, files, APIs, etc.

## Name convention

Resolvers must be named `resolvers.js` as suffix. This way they will be automatically loaded and merged with the rest of resolvers. For instance, having `Animal` as entity, its resolver will be called `animal.resolvers.js`.

## Structure

Technically, a resolver is a function or method that resolves a value for a type or field in a schema.

Below you find the full resolver structure for the [First  Example (part 1)](first-example-1.md#resolver):

```javascript
const dogResolvers = {
  Query: {
    getDog: (root, args) => {
      // implementation...
    },
  },
  Mutation: {
    newDog: (root, args) => {
      // implementation...
    },
  },
};

export default dogResolvers;
```

## Arguments

A resolver function accepts four arguments: *root*, *args*, *context*, *info*. In the [First  Example (part 1)](first-example-1.md#resolver), a resolver file was implemented based on `Dog` entity:

```javascript
getDog: (root, args, context, info) => {
  // implementation here...
}
```

## Using resolvers

Lets take the schema used in the example shown in the [previous section](schema.md#using-schema):

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

Its resolver will looks like the follow (using a datasource):

```javascript
// file: src/entities/Animal/animal.resolvers.js
import { Op } from "sequelize";

const animalResolvers = {
  Query: {
    // getAnimal: (root, args, context)...
    getAnimal: (root, { id }, { ustart }) => {
      return ustart.models.animal.findByPk(id);
    },
    getAnimalsByName: (root, { name }, { ustart }) => {
      return ustart.models.animal.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        }
      });
    },
  },
  Mutation: {
    addAnimal: (root, args, { ustart }) => {
      const { name, age, category } = args;

      return ustart.models.animal.create({ name, age, category });
    },
  },
};

export default animalResolvers;
```

> In order to make this example work you will have to define an `Animal` model. Read the section [Datasource](datasources.md) to learn how.

If you look at the return statement of the resolver, you will see that all of them returns a promise. A promise that comes from Sequelize library (from the `create`, `find` and `findAll` methods).
