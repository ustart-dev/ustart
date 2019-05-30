---
id: commands
title: CLI Commands
---

## Installation

```
npm install -g ustart-cli
```

## Usage

```
ustart --help
ustart --version
ustart init
ustart build [options]
```

## Reference

### `ustart init`

Initializes a uStart project by creating the folder structure, JS scripts and installing npm dependencies . It requires an empty folder with NO package.json.

### `ustart build`

Options | Default | Description
------- | ------- | -----------
`--dev` | `false` | Builds the current project for dev purposes by keeping code comments and without minified. Do not add this for production builds.

Builds the current project into `dist` folder. It removes code comments and apply code minification. It cleans `dist` content before building.
