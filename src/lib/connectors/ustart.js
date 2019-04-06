'use strict';

import Sequelize from "sequelize";
import mongoose from "mongoose";
import url from "url";
import { Utils } from "../helpers";

/**
 * Datasources connector.
*/
class Ustart {

  constructor() {
    this.datasources = {};
    this.models = {};
  }

  /**
   *
  */
  connect(uri, options = null) {
    const urlParts = url.parse(uri);

    const datasource = urlParts.protocol.replace(/:$/, "");

    if (typeof this.datasources[datasource] !== "undefined") {
      throw new Error(`You have already connected to a datasource: ${datasource}. Ustart does not support multiples instances of the same datasource.`);
    }

    const library = Utils.datasourceToLibrary(datasource);
    if (library === "sequelize") {
      this.datasources[datasource] = new Sequelize(uri, options);
    } else if (library === "mongoose") {
      this.datasources[datasource] = mongoose.connect(uri, options);
    }
  }

  /**
   *
  */
  defineModel(datasource, modelName, modelInstance) {
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
      this.models[modelName] = this.datasources[datasource].define(modelName, modelInstance);
    } else if (library === "mongoose") {
      // In this case, modelInstance must be a mongoose schema.
      this.models[modelName] = mongoose.model(modelName, modelInstance);
    }
  }

  /**
   * Synchronizes all Sequelize databases. Returns a promise.
   * options: Sequelize.sync options
  */
  syncDatasources(options) {
    const promiseList = [];

    for (const dts in this.datasources) {
      if (this.datasources.hasOwnProperty(dts) && Utils.datasourceToLibrary(dts) === "sequelize") {
        promiseList.push(this.datasources[dts].sync(options));
      }
    }

    return Promise.all(promiseList);
  }
}

const ustart = new Ustart();

export { ustart };
