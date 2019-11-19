---
id: permissions
title: Permissions
---

uStart provides seamless integration with [Graphql shield](https://github.com/maticzav/graphql-shield) package which provides the permission layer.

## Installation

Graphql shield support is installed...
* by default if you say *yes* in the prompt while initializing the project with `npx ustart-cli init`
* or explicitly using `npx ustart-cli init --shield`
* or by installing it yourself using `npx ustart install shield`

## Define Permissions

There are two parts to consider when using permissions layer: implement the rules and apply those rules.

The first one must be done using `rules.js` script located at `src/shield/` folder. For example, a `User` entity can have the follow rules:

```js
import { rule } from "graphql-shield";

// ...getUserFromCtx(), ...hasRole()
export const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return existUser(getUserFromCtx(ctx));
});

export const isAdmin = rule()(async (parent, args, ctx, info) => {
  const user = getUserFromCtx(ctx);
  return existUser(user) && hasRole(user.roles, "ADMIN");
});
```

The second one must be done per entity and its name should have the suffix `permissions.js`. For example, for `User` entity there is going to be a `user.permissions.js` file that specifies how rules are applied to its schema:

```js
import { isAdmin, isAuthenticated } from "./shield/rules";

const permissions = {
  Query: {
    allUsers: isAdmin,
    currentUser: isAuthenticated,
  },
  Mutation: {
    changePassword: isAuthenticated,
    suspendAccount: isAdmin,
  },
};

export default permissions;
```

> It is very important that you export your permissions object, otherwise uStart will not load it.

If you have used `graphql-shield` before you will realize that it is the same format. So, what uStart does? It provides you with a modularized way of defining your permissions, it loads and merge them across entities for you.

## Shield options

There is a third file that allows you to customize the `graphql-shield` options. It is `options.js` script located at `src/shield` folder. The object `shieldOptions` will be passed directly to shield function as the second argument and its attributes are the same. More details on [shield function](https://github.com/maticzav/graphql-shield#shieldrules-options) documentation.

## GraphQL Mocking

If [FAST_MOCKING](project-overview.md#env) option is enabled, uStart will ignore all permissions files.
