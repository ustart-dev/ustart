---
id: schema-directives
title: Schema Directives
---

uStart uses Apollo GraphQL Schema Directives, everything you do with it, works here.

## Using Schema Directives

Place your *directives* implementations at the folder `src/directives` and add them to `schemaDirectives` object at the `index.js` file in the same folder. uStart will load `schemaDirectives` object automatically and pass it to `makeExecutableSchema` function.

In case you don't use directives schema just comment the export.

You can find more details about its implementation and options on [Apollo GraphQL](https://www.apollographql.com/docs/graphql-tools/schema-directives.html) documentation.

## Example

In this section, we are going to build a schema directive that transform an argument to upper case before execute the resolver function. The schema directive is called `uppercase`. In this example we are going to use `Example` entity.

First, define `uppercase` in the entities graphql type. At the beginning of `example.type.graphql` add the directive:

```graphql
directive @uppercase on FIELD_DEFINITION
```

In the same file, define a mutation and add the schema directive after the returns statement:

```graphql
type Mutation {
  setNameInUpperCase(name: String!): String @uppercase
}
```

In this case the resolver function could be as simple as:

```javascript
// file: src/entities/Example/example.resolvers.js
const exampleResolvers = {
  Mutation: {
    setNameInUpperCase: (root, args, context) => {
      return args.name;
    },
  },
};

export default exampleResolvers;
```

Create the script `UpperCaseDirective.js` at the `src/directives` and paste the follow implementation of `uppercase`:

```javascript
import { SchemaDirectiveVisitor } from "graphql-tools";

export default class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = function (...args) {
      const { name } = args[1];
      args[1] = { name: name.toUpperCase() };
      return resolve.apply(this, args);
    };
  }
}
```

Open `src/directives/index.js` and add `uppercase` to `schemaDirectives`:
```javascript
import UpperCaseDirective from "./UpperCaseDirective";

const schemaDirectives = {
  uppercase: UpperCaseDirective
};

export { schemaDirectives };
```

Now we can test our schema directive. Start your backend, open the playground and paste:

```graphqL
mutation {
  setNameInUpperCase (name: "jhon")
}
```

It should return:

```json
{
  "data": {
    "setNameInUpperCase": "JHON"
  },
}
```
