/**
 * Busca, carga y fusiona los permisos de graphql-shield.
 * Se reutiliza la función de loading de merge-graphql-schemas para buscar y cargar
 * los scripts. Se utiliza la función merge de la librería lodash para fusionar
 * profundamente los objetos cargados.
*/
import path from "path";
import {
  fileLoader
} from "merge-graphql-schemas";
import appRoot from "app-root-path";
import {
  merge as _merge,
} from "lodash";
import {
  ENTITIES_DIR,
  PLUGINS_DIR,
  PERMISSIONS_GLOB
} from "../constants";

function loadPermissions() {
  const permissions = {};

  fileLoader(
    path.join(appRoot.toString(), `{/${ENTITIES_DIR}/${PERMISSIONS_GLOB},/${PLUGINS_DIR}/${PERMISSIONS_GLOB}}`),
    { all: true, extensions: ['.js'] }
  ).forEach(
    e => _merge(permissions, e)
  );

  return permissions;
};

export { loadPermissions };
