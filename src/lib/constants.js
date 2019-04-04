/**
 * Este fichero contiene las constantes del backend.
*/
import appRoot from "app-root-path";

/**
 * Define el glob para cargar los tipos de graphql.
 * Documentación de glob: https://www.npmjs.com/package/glob
*/
export const TYPES_GLOB = "**/*.type.graphql";

/**
 * Define el glob para cargar los resolutores.
*/
export const RESOLVERS_GLOB = "**/*.resolvers.*";

/**
 * Define el glob para cargar los permisos.
*/
export const PERMISSIONS_GLOB = "**/*.permissions.*";

/**
 * Define el glob para cargar los modelos.
*/
export const MODELS_GLOB = "**/*.model.*";

/**
 * Define el glob para cargar los mocks rápidos.
*/
export const FASTMOCKS_GLOB = "**/mocks/*.mocks.*";

/**
 * Define el directorio de fuentes. Si NODE_ENV
 * es 'development' se carga 'src'; en caso contrario 'dist'.
*/
export const SRC_DIR = process.env.NODE_ENV === "development" ? "src" : "dist";

/**
 * Define la ruta absoluta del directorio fuentes.
*/
export const SRC_PATH = `${appRoot}/${SRC_DIR}`;

/**
 * Directorio de plugins.
*/
export const PLUGINS_DIR = "plugins";

/**
 * Ruta absoluta al directorio de plugins.
*/
export const PLUGINS_PATH = `${appRoot}/${PLUGINS_DIR}`;

/**
 * Directorio de entidades.
*/
export const ENTITIES_DIR = "entities";

/**
 * Ruta absoluta al directorio de entidades.
*/
export const ENTITIES_PATH = `${SRC_PATH}/${ENTITIES_DIR}`;

/**
 * Directorio de datos para la BD.
*/
export const DATA_DIR = "data";

/**
 * Ruta absoluta al directorio de datos.
*/
export const DATA_PATH = `${SRC_PATH}/${DATA_DIR}`;

/**
 * Directorio de suscripciones.
*/
export const SUBSCRIPTION_DIR = "subscription";

/**
 * Ruta absoluta al directorio de suscripciones.
*/
export const SUBSCRIPTION_PATH = `${SRC_PATH}/${SUBSCRIPTION_DIR}`;

/**
 * Directorio de directivas de esquema.
*/
export const DIRECTIVES_DIR = "directives";

/**
 * Ruta absoluta de directivas de esquema.
*/
export const DIRECTIVES_PATH = `${SRC_PATH}/${DIRECTIVES_DIR}`;

/**
 * Query vacía. Se utiliza cuando no se encuentra ningún tipo definido.
*/
export const EMPTY_QUERY = `
type Query {
  _EMPTY_: String
}
`;
