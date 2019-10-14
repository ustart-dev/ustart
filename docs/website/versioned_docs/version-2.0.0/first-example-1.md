---
id: version-2.0.0-first-example-1
title: First Example (part 1)
original_id: first-example-1
---

After initializing your project, you now have a skeleton to work from for your specific app. The following shows a basic example to continue with.

## Directory Structure

Move to the root of your project and create the `Dog` directory in `src/entities`:

```bash
mkdir ./src/entities/Dog
```

Create both the types and resolver scripts:

```bash
touch ./src/entities/Dog/dog.type.graphql
touch ./src/entities/Dog/dog.resolvers.js
```

uStart uses name convention for files and exports to make your development fast. Every graphql file must have the suffix `type.graphql` to be loaded by uStart. Same for resolvers, they use the suffix `.resolvers`.

## GraphQL types

Open `dog.type.graphql` and paste:

```graphql
type Dog {
  id: Int
  name: String
  age: Int
}

type Query {
  getDog(id: Int!): Dog
}

type Mutation {
  newDog(name: String!, age: Int!): Dog
}
```

We have defined a type `Dog` with three attributes: id, name and age. One query to get one dog and one mutation to register a new dog.

## Resolver

Open `dog.resolvers.js` and paste:

```javascript
let index = 0;
const dogList = [];

const dogResolvers = {
  Query: {
    getDog: (root, args) => {
      const { id } = args;

      return dogList.find(e => e.id == id);
    },
  },
  Mutation: {
    newDog: (root, args) => {
      const d = { id: ++index, name: args.name, age: args.age };

      dogList.push(d);

      return d;
    },
  },
};

export default dogResolvers;
```

Note that the default export `dogResolvers` is required by uStart.

## Running

Now we are ready to test out our graphql backend.

```bash
npm start
```

Open your browser and enter to `localhost:4000`. Port `4000` is the default if you have not changed it in `.env` file. Once the playground is loaded you are ready to play!.

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

There is no dog yet, so we don't expect any data.

We register our first dog by using the `newDog` mutation:

```graphql
mutation {
  newDog (name: "Boby", age: 5) {
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
      "name": "Boby",
      "age": 5
    }
  }
}
```

We re-run `getDog` and it should return:
```json
{
  "data": {
    "getDog": {
      "name": "Boby",
      "age": 5
    }
  }
}
```

## Homework

Add more dogs and implement your own query to get all registered dogs. Its name could be something like `getAllDogs` and return `[Dog]`.
