---
id: version-2.0.0-build-deploy
title: Build & Deploy
original_id: build-deploy
---

uStart provides a set of scripts to help you build and serve your app. These scripts can be invoked with the run command when using npm or the uStart command line (cli).

## package.json

The `npx ustart-cli init` command creates a package.json with the follow script entries to help you manage the build process:

* `clean`: Cleans the `dist` folder at the root of your project.
* `build`: Build the project for production.
* `build:dev`: Build the project for development.
* `watch-src`: Start babel to watch the *src* folder.
* `watch-node`: Start nodemon to watch the *dist* folder.
* `start`: Start the app for development.
* `serve`: Serves the app for production.

The `ustart-cli` package provides a wrapper around the *build* scripts. Use `npx ustart build [--dev]` for building an app for *production* and *development* purposes.

At the moment, executing `npx ustart build --dev` does: `npm run build:dev` in the root of your project. The same for `npx ustart build` does: `npm run build`. Thus you can use both ways indistinctly.

> This behavior will change in future releases in order to support a better process for building, testing and deploying.

## Build

When you run `npm start` your code is built for development purpose using `build:dev`, then two scripts are executed concurrently: `watch-src` and `watch-node`. `watch-src` watches the *src* folder using babel, if any change is detected, it is compiled and copied to the *dist* folder. `watch-node` uses nodemon to watch `dist` folder, if any change is detected, nodemon will restart the server for you. This mode is for development only, **do not** use it on **production** environments.

> **Breaking change**: Prior to version 2.x, `npm start` use `nodemon` and `babel-node` to run your app. It also required you to set **NODE_ENV** distinct to *production*, in this way ustart module loaded your project from `src` folder.

`npx ustart build` compile your project sources into the `dist` folder at the root of your project. It uses babel 6 to compile, also apply code minification and comment removal. Add `--dev` option to keep code comments and not minify.

To run your code for **production** use the `serve` command: `npm run serve`. Remember to build it before.

> **Breaking change**: Prior to version 2.x, `npm serve` required you to set **NODE_ENV** to *production*. This is no longer required in version 2.0 because ustart module always loads your code from `dist` folder.

## Packaging

To pack your project for deploying outside of your develop machine, use `npm pack` to create a `tgz` file. It will be named `your-project-name-X.Y.X.tgz` where X.Y.Z correspond to `version` attribute from `package.json`.

## General process

The process for building and deploying looks like the follow:

1. Make a build: `npx ustart build`.
1. Pack the project: `npm pack`.
1. Copy the `tgz` file into the deployment server.
1. Unpack it: `tar zxvf project-name.X.Y.Z.tgz`, move into the unpacked folder and install all production dependencies `npm install --production`.
1. Make sure that *NODE_ENV* is set to **production**, along with the rest of environmental variables needed by your app.
1. Serve your app: `npm run serve`.

> It is highly recommended to automate this process.
