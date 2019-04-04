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
  ENTITIES_PATH,
  PLUGINS_PATH,
  TYPES_GLOB,
  EMPTY_QUERY
} from "../constants";

function loadTypeDefs() {
  const files = fileLoader(
    `{${ENTITIES_PATH}/${TYPES_GLOB},${PLUGINS_PATH}/${TYPES_GLOB}}`
  );

  let typeDefs = null;
  if (files.length > 0) {
    typeDefs = mergeTypes(files, { all: true });
  }

  return typeDefs || EMPTY_QUERY;
};

export { loadTypeDefs };
