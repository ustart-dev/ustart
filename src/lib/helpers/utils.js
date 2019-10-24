'use strict';

const Utils = {};

/**
 * Returns the library used by datasource.
*/
Utils.datasourceToLibrary = function (datasource) {
  if (typeof datasource !== "string") {
    throw new Error(`Wrong datasource type: expected string got ${typeof datasource}.`);
  }

  if (
    datasource === "mariadb" ||
    datasource === "mssql" ||
    datasource === "mysql" ||
    datasource === "postgres" || 
    datasource === "sqlite"
  ) {
    return "sequelize";
  } else if (datasource === "mongodb") {
    return "mongoose";
  } else {
    throw new Error(`Datasource is not supported: ${datasource}`);
  }
};

/**
 * Throws an error if a package is not available.
*/
Utils.checkPackageAvailability = function (module, moduleName) {
  if (!module) {
    throw new Error(`You are trying to use a function that belongs to ${moduleName} package, but none is installed.`);
  }
};

/**
 * Requires a module just like standard require does but instead of throwing
 * an error if module is not found it returns null.
*/
Utils.require = function (module) {
  let m;
  try {
    m = require(module);
  } catch (err) {
    m = null;
  }
  return m;
};

export { Utils };
