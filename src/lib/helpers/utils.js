'use strict';

const Utils = {};

/**
 * Resuelve la librería que utiliza el datasource proporcionado.
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

export { Utils };
