import { CONFIG_PATH } from "../constants";

/**
 * Loads the data sources file.
*/
function loadDatasources() {
  require(`${CONFIG_PATH}/datasources`);
};

export { loadDatasources };
