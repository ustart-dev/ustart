/**
 * Este fichero contiene las constantes del backend.
*/
import appRoot from "app-root-path";

/**
 * Entorno en que se ejecuta el servidor: "PRODUCTION", "DEV", "DEV-CLEAN", "TESTING".
 * Mayor documentación sobre que realiza cada modo en data/mocks.js
*/
export const SERVER_MODE = process.env.SERVER_MODE;

/**
 * Define la ruta relativa de la carpeta entities.
*/
export const ENTITIES_DIR = "src/entities";

/**
 * Define la ruta relativa de la carpeta plugins.
*/
export const PLUGINS_DIR = "plugins";

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
 * Define la ruta absoluta del directorio src
*/
export const SRC_DIR = `${appRoot}/src`;

/**
 * Define la ruta absoluta del directorio de datos para la BD
*/
export const SRC_DATA_DIR = `${SRC_DIR}/data`;

/**
 * Define la ruta absoluta del directorio de suscripcion
*/
export const SUBSCRIPTION_DIR = `${SRC_DIR}/subscription`;

/**
 * Define la ruta absoluta del directorio de directivas de esquema
*/
export const DIRECTIVES_DIR = `${SRC_DIR}/directives`;

/**
 * Query vacía. Se utiliza cuando no se encuentra ningún tipo definido.
*/
export const EMPTY_QUERY = `
type Query {
  _EMPTY_: String
}
`;
