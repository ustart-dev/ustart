/**
 * Carga las directivas de esquema definidas por el usuario.
 * Docs: https://www.apollographql.com/docs/graphql-tools/schema-directives.html
*/
import {
  DIRECTIVES_PATH
} from "../constants";

const directives = require(DIRECTIVES_PATH);

function loadSchemaDirectives() {
  return directives && directives.schemaDirectives || null;
}

export { loadSchemaDirectives };
