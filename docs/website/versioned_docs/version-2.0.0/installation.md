---
id: version-2.0.0-installation
title: Installation
sidebar_label: Installation
original_id: installation
---

## Installing uStart

Ensure you have the latest [Node](https://nodejs.org/en/download/) installed

> You have to be on Node >= 8.x

Create a new folder for your project
```shell
mkdir awesome-project
cd awesome-project
```

Initialize with the ustart CLI. This will create the project structure and
install all NPM dependencies for you
```shell
npx ustart-cli init
```

> Note that the above instruction uses the alpha version.

We use `npx` to avoid global installation of the CLI. Once npx finish the `ustart-cli` will be available as a local package by typing `npx ustart <command>`.

## Verfying Installation

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
