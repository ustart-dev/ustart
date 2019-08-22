import {
  DIRECTIVES_PATH
} from "../constants";

/**
 * It loads schemas directive.
 * Docs: https://www.apollographql.com/docs/graphql-tools/schema-directives.html
*/
function loadSchemaDirectives() {
  const directives = require(DIRECTIVES_PATH);
  
  return directives && directives.schemaDirectives || null;
}

export { loadSchemaDirectives };
