# CHANGELOG

This is the log of notable changes to the ustart core package.

----

## master

### 🛠 Breaking changes

### 🎉 New features

- Added support to optional mongoose installation

### 🐛 Bug fixes

## 2.0

### 🛠 Breaking changes

- Replaced NODE_ENV value for "testing" to "test", because it is more standard
- Moved plugins folder from "/plugins" to "/src/plugins"
- Stopped loading code from src folder, now only dist folder will be use to it, this is part of the improvements of build process
- Replaced "_EMPTY_" query with "hello" query
- Moved datasource script to config folder
- Moved yoga config file from /src/config/yoga to /config
- Moved ustart scripts and template folder into its own package [ustart-scripts](https://github.com/ustart-dev/ustart-scripts)

### 🎉 New features

- Added loadDatasources helper
- Added support for migrations into ustart class
- Added helper functions to the core export
- Added LICENSE, COLLABORATORS and CHANGELOG files

### 🐛 Bug fixes

- Fixed the path for loading plugin's mocking files
- Fixed NPM warning that graphql is not installed (added as dependency)

## 1.0.0

- Not documented
