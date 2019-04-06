import path from "path";
import {
  fileLoader
} from "merge-graphql-schemas";
import appRoot from "app-root-path";
import {
  merge as _merge,
  cloneDeep as _cloneDeep
} from "lodash";
import {
  ENTITIES_PATH,
  PLUGINS_PATH,
  FASTMOCKS_GLOB
} from "../constants";

/**
 * Search, load and merge fast mocking from entities and plugins.
 * The root type of the mock function must be defined as a function that return a literal object.
 * For example:

  User: () => ({
    id: ....
  })

 * This is not the case for "Query" and "Mutation" which must be defined as objects.
 * These objects will be merged with the rest of fast mocks defined in entities and plugins.

 Query: {
    allUsers: ....
 }

 * We have to convert the merged Query and Mutation fields defined as objects into
 * functions that return literal objects to be able to execute them.
 * Docs: https://github.com/apollographql/graphql-tools/blob/master/docs/source/mocking.md
*/
function loadFastMocking() {
  const fastMocks = {};

  fileLoader(
    `{${ENTITIES_PATH}/${FASTMOCKS_GLOB},/${PLUGINS_PATH}/${FASTMOCKS_GLOB}}`,
    { all: true, extensions: ['.js'] }
  ).forEach(
    e => _merge(fastMocks, e)
  );
  // Manual conversion to function that return a literal object
  if (fastMocks.Query) {
    const q = _cloneDeep(fastMocks.Query);
    fastMocks.Query = function Query() { return q };
  }
  // Manual conversion to function that return a literal object
  if (fastMocks.Mutation) {
    const m = _cloneDeep(fastMocks.Mutation);
    fastMocks.Mutation = function Mutation() { return m };
  }

  return fastMocks;
};

export { loadFastMocking };
