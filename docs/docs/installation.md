---
id: installation
title: Installation
sidebar_label: Installation
---

## Installing uStart

Ensure you have the latest [Node](https://nodejs.org/en/download/) installed

> You have to be on Node >= 8.x

Create a new project using the CLI. The `init` command will ask you three questions: answer **no** to all of them. This will create the project structure and install all NPM dependencies for you

```shell
npx ustart-cli init awesome-project
```

We use `npx` to avoid a global installation of the CLI. Once npx finish the `ustart-cli` will be available as a local package by typing `npx ustart <command>`.

## Verfying Installation

Run your project
```shell
cd awesome-project
npm run start
```

If everything has gone well your console will log:
```
NODE_ENV: development
Server is running on http://localhost:4000
```

Good, that means you have running the playground on `localhost` port `4000`.

Execute your first query. Open your browser and open [localhost:4000](http://localhost:4000), go to the left panel and type:
```graphql
query {
  hello
}
```

Press the play icon in the middle of both panels, then the right panel should show:
```graphql
"data": {
  "hello": "Hello there, everything is right. You can keep reading the docs!"
}
```

If the response is the same you are ready to play!.
