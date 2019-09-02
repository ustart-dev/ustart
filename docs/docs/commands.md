---
id: commands
title: CLI Commands
---

## Initialize a project

```
$ mkdir your-awesome-project
$ cd your-awesome-project
$ npx ustart-cli@alpha init
```

## Usage

```
$ npx ustart --help
$ npx ustart --version
$ npx ustart build [options]
$ npx ustart db:migrate
$ npx ustart migration:autogenerate --name "migration-name"
```

## Reference

### `npx ustart-cli init`

Initializes a uStart project by creating the folder structure, JS scripts and installing npm dependencies . It requires an empty folder with NO package.json.

### `npx ustart build`

Options | Default | Description
------- | ------- | -----------
`--dev` | `false` | Builds the current project for dev purposes by keeping code comments and without minified. Do not add this for production builds.

Builds the current project into `dist` folder. It removes code comments and apply code minification. It cleans `dist` content before building.
