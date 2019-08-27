import { DATA_PATH } from "../constants";

/**
 * Loads the data sources file.
*/
function loadDatasources() {
  require(`${DATA_PATH}/datasources`);
};

export { loadDatasources };
