---
id: build-deploy
title: Build & Deploy
---

uStart provides a set of scripts to help you build and serve your app. These scripts can be invoked with the run command when using npm or the uStart command line (cli).

## package.json

The `ustart init` command creates a package.json with the follow script entries to help you manage the build process:

* `clean`: Cleans the `dist` folder at the root of your project.
* `build`: Build the project for production.
* `build:dev`: Build the project for development.
* `start`: Start the app for development.
* `serve`: Serves the app for production.

The `ustart-cli` package version `1.1.X` provides a wrapper around the *build* scripts. It has the `ustart build [--dev]` for building an app for *production* and *development* purposes.

At the moment, executing `ustart build --dev` does: `npm run build:dev` in the root of your project. The same for `ustart build` does: `npm run build`. Thus you can use both indistinctly.

> This behavior will change in future releases in order to support an automatic process for building, testing and deploying.

## Build

When you do `npm start` you are using `nodemon` and `babel-node` to run your app. This mode is for development, **do not** use it for **production**.

`ustart build` compiles your project sources into the `dist` folder at the root of your project. It uses babel 6 to compile, also apply code minification and comment removal. Add `--dev` option to keep code comments and not minify.

To run your built code from `dist` folder you have to execute the `serve` command: `node run serve`. You have to set **NODE_ENV** to *production*, this way the ustart module loads your project from `dist` folder.

## Packaging

To pack your project for deploying it outside of your develop machine, use `npm pack` to create a `tgz` file. It will be named `your-project-name-X.Y.X.tgz` where X.Y.Z correspond to `version` attribute from `package.json`.

## General process

The process for building and deploying looks like the follow:

1. Make a build: `ustart build`.
1. Pack the project: `npm pack`.
1. Copy the `tgz` file into the deployment server.
1. Unpack it: `tar zxvf project-name.X.Y.Z.tgz` and install all production dependencies `npm install --production`.
1. Make sure that *NODE_ENV* is set to **production**, along with the rest of environmental variables needed by your app.
1. Serve your app: `npm run serve`.
