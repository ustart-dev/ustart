/**
 * Busca y carga los modelos, y sus asociaciones.
 * Se reutiliza la función de loading de merge-graphql-schemas para buscar y cargar
 * los scripts.
*/
import path from "path";
import {
  fileLoader
} from "merge-graphql-schemas";
import appRoot from "app-root-path";
import {
  ENTITIES_PATH,
  PLUGINS_PATH,
  MODELS_GLOB,
  SRC_PATH
} from "../constants";

function loadModels() {
  fileLoader(
    `{${ENTITIES_PATH}/${MODELS_GLOB},${PLUGINS_PATH}/${MODELS_GLOB}}`,
    { all: true, extensions: ['.js'] }
  );
  require(`${SRC_PATH}/models/associations`);
};

export { loadModels };
