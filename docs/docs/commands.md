---
id: commands
title: CLI Commands
---

## Initialize a project

```
$ npx ustart-cli init MyNewProject
$ cd MyNewProject && npm start
```

## Usage

*init* command usage:

```
$ npx ustart-cli init <project-name> [--mongoose | --no-mongoose] [--sequelize | --no-sequelize] [--shield | --no-shield] [--assumeyes, --y] [--assumeno, --n]
```

After initialize a project using *init* command, the cli will be available locally:

```
$ npx ustart --help
$ npx ustart --version
$ npx ustart build [options]
$ npx ustart db:migrate
$ npx ustart migration:autogenerate --name "migration-name"
```

## Reference

> Remember to append `npx` before every command.

### `ustart-cli init`

Initializes a project by creating the folder structure, JS scripts and installing npm dependencies. After running this command the CLI will be available as a local package with `npx ustart <command>`.

Options | Default | Description
------- | ------- | -----------
`project-name` |  | Project name. The CLI will create the folder.
`--mongoose` &#124; `--no--mongoose` |  | Set to install or not install mongoose during initialization. If no option is provided the CLI will prompt for a value.
`--sequelize` &#124; `--no--sequelize` |  | Set to install or not install sequelize support during initialization. If no option is provided the CLI will prompt for a value.
`--shield` &#124; `--no--shield` |  | Set to install or not install permission layer (graphql-shield) during initialization. If no option is provided the CLI will prompt for a value.
`--assumeyes, --y` |  | Assume yes; assume that the answer to any question which would be asked is yes.
`--assumeno, --n` |  | Assume no; assume that the answer to any question which would be asked is no.

### `ustart build`

Options | Default | Description
------- | ------- | -----------
`--dev` | `false` | Builds the current project for dev purposes by keeping code comments and without minified. Do not add this for production builds.

Builds the current project into `dist` folder. It removes code comments and apply code minification. It cleans `dist` content before building.

### `ustart db:migrate`

Run all pending migrations.

### `ustart migration:autogenerate`

Options | Default | Description
------- | ------- | -----------
`--name` |  | Name of the migration.

Autogenerates a migration based on the models' difference from the last run of this command. Only works with Sequelize models.
