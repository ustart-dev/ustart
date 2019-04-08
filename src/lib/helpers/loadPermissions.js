import path from "path";
import {
  fileLoader
} from "merge-graphql-schemas";
import {
  merge as _merge,
} from "lodash";
import {
  ENTITIES_PATH,
  PLUGINS_PATH,
  PERMISSIONS_GLOB
} from "../constants";

/**
 * It search, load and merge graphql-shield permissions.
*/
function loadPermissions() {
  const permissions = {};

  fileLoader(
    `{${ENTITIES_PATH}/${PERMISSIONS_GLOB},${PLUGINS_PATH}/${PERMISSIONS_GLOB}}`,
    { all: true, extensions: ['.js'] }
  ).forEach(
    e => _merge(permissions, e)
  );

  return permissions;
};

export { loadPermissions };
