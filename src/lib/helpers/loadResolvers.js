import path from "path";
import {
  fileLoader,
  mergeResolvers
} from "merge-graphql-schemas";
import {
  ENTITIES_PATH,
  PLUGINS_PATH,
  RESOLVERS_GLOB
} from "../constants";

/**
 * It search, load and merge graphql resolvers.
*/
function loadResolvers() {
  return mergeResolvers(
    fileLoader(
      `{${ENTITIES_PATH}/${RESOLVERS_GLOB},${PLUGINS_PATH}/${RESOLVERS_GLOB}}`,
      { all: true }
    )
  );
};

export { loadResolvers };
