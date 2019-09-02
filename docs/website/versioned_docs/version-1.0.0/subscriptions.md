---
id: version-1.0.0-subscriptions
title: Subscriptions
original_id: subscriptions
---
uStart uses `graphql-subscriptions` package to support subscriptions, everything you can do with it, works here.

## Using Subscriptions

There are two parts to consider when using subscriptions: use a subscription implementation (or make your own) and implement the subscriptions resolvers.

The first one must be done using `src/subscription/index.js` script. For example, to use the basic subscription implementation of `PubSub` you can do the follow:

```js
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export default pubsub;
```

uStart automatically loads the exported `pubsub` and add it to the context. In case you don't use subscriptions just comment the export.

> Note that the default PubSub implementation is intended for demo purposes. It only works if you have a single instance of your server and doesn't scale beyond a couple of connections. For production usage you'll want to use one of the PubSub implementations backed by an external store (e.g. Redis). -- graphql subscriptions package docs

The second one must be done per entity and consists of implementing the subscriptions resolvers. The following example was taken from `graphql-subscription` documentation:

```js
const SOMETHING_CHANGED_TOPIC = 'something_changed';

const exampleResolvers = {
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
    },
  },
};

export default exampleResolvers;
```

You can find more details about its implementation and options:

* https://github.com/apollographql/graphql-subscriptions
* https://github.com/prisma/graphql-yoga#pubsub
* https://github.com/prisma/graphql-yoga/tree/master/examples/subscriptions

## Example

In this example we are going to implement a subscription resolver that says "Hello: [counter]" every X seconds. The entity is `Example`.

Open `src/subscription/index.js` and paste:

```js
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export default pubsub;
```

Create `example.type.graphql` and paste:

```graphql
type Subscription {
  sayHelloEvery(seconds: Int!): String
}
```

Create `example.resolvers.js` and paste:

```javascript
const exampleResolvers = {
  Subscription: {
    sayHelloEvery: {
      subscribe: (parent, args, { pubsub }) => {
        const { seconds } = args;
        const channel = Math.random().toString(36).substring(2, 15); // random channel name
        let count = 0;
        setInterval(() => pubsub.publish(channel, { sayHelloEvery: `Hello: ${count++}` }), seconds * 1000);
        return pubsub.asyncIterator(channel);
      },
    }
  }
};

export default exampleResolvers;
```

Now, start your backend and execute the follow subscription on the playground:

```graphql
subscription {
  sayHelloEvery(seconds: 3)
}
```

And the result should be:
```json
{
  "data": {
    "sayHelloEvery": "Hello: 0"
  }
}
-----
{
  "data": {
    "sayHelloEvery": "Hello: 1"
  }
}
-----
{
  "data": {
    "sayHelloEvery": "Hello: 2"
  }
}
-----
{
  "data": {
    "sayHelloEvery": "Hello: 3"
  }
}
```

The server will keep saying hello every X seconds and increasing the counter until you stop it.

## PubSub implementations

There are a lot of subscriptions that you can use right out of the box by installing the PubSub implementations documented in [pubsub implementations](https://github.com/apollographql/graphql-subscriptions#pubsub-implementations). There are for Redis, Google PubSub, MQTT, RabbitMQ, AMQP (RabbitMQ), Kafka, Postgres and more.
