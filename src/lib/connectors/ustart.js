'use strict';

import Sequelize from "sequelize";
import mongoose from "mongoose";
import url from "url";
import { Utils } from "../helpers/utils";

/**
 * Datasources connector.
*/
class Ustart {

  constructor() {
    this.datasources = {};
    this.models = {};
    // NOTE: isSyncEnabled is a temporary solution, while the model generator is being implemented
    this.isSyncEnabled = true;
    this.migration = null;
  }

  /**
   * Add a connexion to a datasource. It uses two libraries: Sequelize and Mongoose.
   * Sequelize supports Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
   * Mongoose supports MongoDB.
  */
  connect(uri, options = null, ustartOptions = null) {
    const urlParts = url.parse(uri);

    const datasource = urlParts.protocol.replace(/:$/, "");

    if (typeof this.datasources[datasource] !== "undefined") {
      throw new Error(`You have already connected to a datasource: ${datasource}. Ustart does not support multiples instances of the same datasource.`);
    }

    const library = Utils.datasourceToLibrary(datasource);
    if (library === "sequelize") {
      this.datasources[datasource] = new Sequelize(uri, options);
      if (ustartOptions.enableMigration) {
        this.migration = { datasource, uri };
      }
    } else if (library === "mongoose") {
      this.datasources[datasource] = mongoose.connect(uri, options);
      if (ustartOptions.enableMigration) {
        console.log("Migrations only works with Sequelize data sources.");
      }
    }
  }

  /**
   * Creates a new model in the specified datasource. The method does not perform
   * any business logic validation, all arguments are passed as is.
  */
  defineModel(datasource, modelName, modelInstance, options) {
    if (typeof modelName !== "string") {
      throw new Error(`Wrong type at modelName: expected string got ${typeof modelName}`);
    } else if (typeof modelInstance !== "object") {
      throw new Error(`Wrong type at modelInstance: expected string got ${typeof modelInstance}`);
    }

    if (typeof this.datasources[datasource] === "undefined") {
      throw new Error("You must connect a datasource before define a model");
    }

    if (typeof this.models[modelName] !== "undefined") {
      throw new Error(`You have already defined a modelName: ${modelName}. Model names must be unique.`);
    }

    const library = Utils.datasourceToLibrary(datasource);
    if (library === "sequelize") {
      this.models[modelName] = this.datasources[datasource].define(
        modelName,
        modelInstance,
        options
      );
    } else if (library === "mongoose") {
      // In this case, modelInstance must be a mongoose schema.
      this.models[modelName] = mongoose.model(
        modelName,
        modelInstance,
        options
      );
    }
  }

  /**
   * Synchronizes all Sequelize databases. Returns a promise.
   * options: Sequelize.sync options
  */
  syncDatasources(options) {
    if (!this.isSyncEnabled) {
      return;
    }

    const promiseList = [];

    for (const dts in this.datasources) {
      if (this.datasources.hasOwnProperty(dts) && Utils.datasourceToLibrary(dts) === "sequelize") {
        promiseList.push(this.datasources[dts].sync(options));
      }
    }

    return Promise.all(promiseList);
  }

  /**
   * Set the sync mode for Sequelize. If set to true sequelize will synchronize all
   * models at starting time, otherwise none model will by synchronized.
   * NOTE: This is a temporary solution while the ustart model generator is being implemented.
  */
  setSync(syncEnabled) {
    this.isSyncEnabled = (syncEnabled == true);
  }

  /**
   * Returns the migration data (datasource with migration enabled).
   * It is an object of the shape:
   *  {
   *    datasource: String,
   *    uri: String
   *  }
  */
  getMigration() {
    return this.migration;
  }
}

const ustart = new Ustart();

export { ustart };
