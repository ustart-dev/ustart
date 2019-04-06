import {
  DIRECTIVES_PATH
} from "../constants";

const directives = require(DIRECTIVES_PATH);

/**
 * It loads schemas directive.
 * Docs: https://www.apollographql.com/docs/graphql-tools/schema-directives.html
*/
function loadSchemaDirectives() {
  return directives && directives.schemaDirectives || null;
}

export { loadSchemaDirectives };
