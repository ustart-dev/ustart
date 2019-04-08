import path from "path";
import {
  fileLoader
} from "merge-graphql-schemas";
import {
  ENTITIES_PATH,
  PLUGINS_PATH,
  MODELS_GLOB,
  SRC_PATH
} from "../constants";

/**
 * It search and load models and its associations.
*/
function loadModels() {
  fileLoader(
    `{${ENTITIES_PATH}/${MODELS_GLOB},${PLUGINS_PATH}/${MODELS_GLOB}}`,
    { all: true, extensions: ['.js'] }
  );
  require(`${SRC_PATH}/models/associations`);
};

export { loadModels };
