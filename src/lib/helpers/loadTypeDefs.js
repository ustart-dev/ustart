/**
 * Busca y carga los tipos de graphql.
 * Si no encuentra ningún tipo, retorna la query "_EMPTY_".
*/
import path from "path";
import {
  fileLoader,
  mergeTypes
} from "merge-graphql-schemas";
import appRoot from "app-root-path";
import {
  ENTITIES_DIR,
  PLUGINS_DIR,
  TYPES_GLOB,
  EMPTY_QUERY
} from "../constants";

function loadTypeDefs() {
  const files = fileLoader(
    path.join(appRoot.toString(), `{/${ENTITIES_DIR}/${TYPES_GLOB},/${PLUGINS_DIR}/${TYPES_GLOB}}`)
  );

  let typeDefs = null;
  if (files.length > 0) {
    typeDefs = mergeTypes(files, { all: true });
  }

  return typeDefs || EMPTY_QUERY;
};

export { loadTypeDefs };
