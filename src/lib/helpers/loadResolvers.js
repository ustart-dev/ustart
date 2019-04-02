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
  ENTITIES_DIR,
  PLUGINS_DIR,
  RESOLVERS_GLOB
} from "../constants";

function loadResolvers() {
  return mergeResolvers(
    fileLoader(
      path.join(appRoot.toString(), `{/${ENTITIES_DIR}/${RESOLVERS_GLOB},/${PLUGINS_DIR}/${RESOLVERS_GLOB}}`)
    ),
    { all: true }
  );
};

export { loadResolvers };
