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
  const files = fileLoader(
    `{${ENTITIES_PATH}/${RESOLVERS_GLOB},${PLUGINS_PATH}/${RESOLVERS_GLOB}}`,
  );

  let resolvers = null;
  if (files.length > 0) {
    resolvers = mergeResolvers(files, { all: true });
  } else {
    resolvers = mergeResolvers(fileLoader(`${__dirname}/../assets/hello/hello.resolvers.js`));
  }

  return resolvers;
};

export { loadResolvers };
