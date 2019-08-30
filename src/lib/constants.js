import appRoot from "app-root-path";

/**
 * Glob for loading graphql types.
 * glob doc: https://www.npmjs.com/package/glob
*/
export const TYPES_GLOB = "**/*.type.graphql";

/**
 * Glob for loading resolvers.
*/
export const RESOLVERS_GLOB = "**/*.resolvers.*";

/**
 * Glob for loading permissions.
*/
export const PERMISSIONS_GLOB = "**/*.permissions.*";

/**
 * Glob for loading models.
*/
export const MODELS_GLOB = "**/*.model.*";

/**
 * Glob for loading fast mocks.
*/
export const FASTMOCKS_GLOB = "**/mocks/*.mocks.*";

/**
 * Source folder. If NODE_ENV is set to 'development' it loads from 'src',
 * otherwise from 'dist'.
 * NOTE: Evaluating concurrently package for trying babel watch and nodemon
 *  inside of npm scripts
*/
// export const SRC_DIR = process.env.NODE_ENV !== "production" ? "src" : "dist";
export const SRC_DIR = "dist";

/**
 * Source path.
*/
export const SRC_PATH = `${appRoot}/${SRC_DIR}`;

/**
 * Plugin folder.
*/
export const PLUGINS_DIR = "plugins";

/**
 * Plugin path.
*/
export const PLUGINS_PATH = `${appRoot}/${PLUGINS_DIR}`;

/**
 * Entities folder.
*/
export const ENTITIES_DIR = "entities";

/**
 * Entities path.
*/
export const ENTITIES_PATH = `${SRC_PATH}/${ENTITIES_DIR}`;

/**
 * Data folder.
 * NOTE: This contains the database seeds until the new system is ready.
*/
export const DATA_DIR = "data";

/**
 * Data path.
*/
export const DATA_PATH = `${SRC_PATH}/${DATA_DIR}`;

/**
 * Subscription folder.
*/
export const SUBSCRIPTION_DIR = "subscription";

/**
 * Subscription path.
*/
export const SUBSCRIPTION_PATH = `${SRC_PATH}/${SUBSCRIPTION_DIR}`;

/**
 * Schema directives folder.
*/
export const DIRECTIVES_DIR = "directives";

/**
 * Schema directives path.
*/
export const DIRECTIVES_PATH = `${SRC_PATH}/${DIRECTIVES_DIR}`;

/**
 * Configuration folder (sources).
*/
export const CONFIG_DIR = "config";

/**
 * Configuration path
*/
export const CONFIG_PATH = `${appRoot}/${CONFIG_DIR}`;
