---
id: version-1.0.0-mocking
title: Mocking
original_id: mocking
---

uStart has [graphql-tools](https://www.apollographql.com/docs/graphql-tools/) package integrated as part of its core. It allows you to mock your schema with fake data in order to make your development process faster. The main idea is that you don't have to wait for resolvers implementation to be ready to integrate your frontend.

## Using mocking

uStart automatically loads all mocking files named with the suffix `*.mocks.js` placed at `mocks` folder inside of every entity. For instance, `City` entity (`src/entities/City`) would have `src/entities/City/mocks/city.mocks.js` script with its mocking definitions.

The follow example will response with fake data generated by the `casual` package (run `npm install casual` if you don't have the package):

```graphql
# file: src/entities/City/city.type.graphql
type City {
  id: Int
  name: String
}

type Query {
  allCities: [City]
  getCity (id: Id!): City
}
```

```javascript
// file: src/entities/City/mocks/city.mocks.js
import casual from "casual";
import {
  MockList
} from "graphql-tools";

const cityMocks = {
  City: () => ({ // Function that returns a literal object
    id: casual.integer(1, 18),
    name: casual.city,
  }),
  Query: { // It must be an object
    allCities: () => new MockList(18),
  }
};

export default cityMocks;
```

Note that the root type, `City` in this case, must be a function that returns a literal object. It is not the case of *Query* and *Mutation* that must be objects. This is so because uStart merges all mocking files and pass them  to `addMockFunctionsToSchema` function from `graphql-tools` package.

Start the backend and paste the query `allCities` in your playground:
```graphql
query {
  allCities {
    id,
    name
  }
}
```

Press play, you will see a list of 18 cities that changes every time you re-run the query.

Go ahead and try the query `getCity`:
```graphql
query {
  getCity(id: 1) {
    id,
    name
  }
}
```

You will see that it returns one city and it changes every time you re-run the query.

> Although we did not specify the mocking behavior for `getCity` query, it works anyway. That is because you have defined the root type mocking `City` (query's return type).

## Env option

To tell the backend to response with mocking files instead of resolvers functions, you have to set `FAST_MOCKING` to *true* at the env file placed at the root of your project. By default it is set to *false*.

> It should be noted that permissions validation are skipped when FAST_MOCKING is set to true, thus all queries, mutations and subscriptions would be publicly accessible. This option has even more impact on the framework behavior, when it is activated no user middlewares are loaded (permissions are the first user middleware to be loaded).
