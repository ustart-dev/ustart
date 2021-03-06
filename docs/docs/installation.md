---
id: installation
title: Installation
sidebar_label: Installation
---

## Installing uStart

Ensure you have the latest [Node](https://nodejs.org/en/download/) installed

> You have to be on Node >= 8.x and Git

Create a new project using the CLI. The `init` command will ask you four questions: answer **no** to all of them. This will create the project structure and install all NPM dependencies for you

```shell
npx ustart-cli init awesome-project
```

We use `npx` to avoid a global installation of the CLI. Once npx finish the `ustart-cli` will be available as a local package by typing `npx ustart <command>`.

## Run the project

uStart supports direct execution and docker containers. If you are under a Windows system use the Docker way.

### UNIX and friends (Linux, OSX, etc)

Run your project directly with NPM

```shell
cd awesome-project
npm run start
```


### Docker (UNIX, Linux, OSX, Windows)

First, create a volume using the terminal

```shell
cd awesome-project
docker volume create nodemodules
```

Second, run the docker compose builder file with `install` flag

```shell
docker-compose -f docker-compose.builder.yml run --rm install
```

Third, run it

```shell
docker-compose up
```

## Verifying Installation

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
