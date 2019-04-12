# uStart

uStart is a NodeJS framework for building GraphQL backends using Apollo, Sequelize, Mongoose and other great tools. Check out our site [ustart.dev](https://ustart.dev).

## Getting started

Install the ustart CLI
```shell
npm install -g ustart-cli
```

Create a folder and initialize it with the cli
```shell
mkdir awesome-project
cd awesome-project
ustart init
```

`ustart init` will create a structure and scripts ready to use, so you just have to use the name convention, define your models, write your graphql types and other stuff you will need.

Run your project
```shell
npm run start
```

If everything has gone well your console will log:
```
NODE_ENV: development
Server is running on http://localhost:4000
```

Good, that means you have running the playground on `localhost` port `4000`.

Execute your first query. Open your browser, go to the left panel and type:
```graphql
query {
  _EMPTY_
}
```

Press the play icon (in the middle of both panels) and the right panel should show:
```graphql
"data": {
  "_EMPTY_": null
}
```

If the response is the same you are ready to play!.

More documentation on our site [ustart.dev](https://ustart.dev).
