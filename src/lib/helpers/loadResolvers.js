/**
 * Busca, carga y fusiona los resolutores.
*/
import path from "path";
import {
  fileLoader,
  mergeResolvers
} from "merge-graphql-schemas";
import appRoot from "app-root-path";
import {
  ENTITIES_PATH,
  PLUGINS_PATH,
  RESOLVERS_GLOB
} from "../constants";

function loadResolvers() {
  return mergeResolvers(
    fileLoader(
      `{${ENTITIES_PATH}/${RESOLVERS_GLOB},${PLUGINS_PATH}/${RESOLVERS_GLOB}}`,
      { all: true }
    )
  );
};

export { loadResolvers };
