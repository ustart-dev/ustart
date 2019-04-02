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
  ENTITIES_DIR,
  PLUGINS_DIR,
  MODELS_GLOB,
  SRC_DIR
} from "../constants";

function loadModels() {
  fileLoader(
    path.join(appRoot.toString(), `{/${ENTITIES_DIR}/${MODELS_GLOB},/${PLUGINS_DIR}/${MODELS_GLOB}}`),
    { all: true, extensions: ['.js'] }
  );
  require(`${SRC_DIR}/models/associations`);
};

export { loadModels };
