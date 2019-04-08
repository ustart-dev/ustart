import path from "path";
import {
  fileLoader,
  mergeTypes
} from "merge-graphql-schemas";
import {
  ENTITIES_PATH,
  PLUGINS_PATH,
  TYPES_GLOB,
  EMPTY_QUERY
} from "../constants";

/**
 * Loads the graphql types. If there is no type to load, it returns an empty
 * query: "_EMPTY_".
*/
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
