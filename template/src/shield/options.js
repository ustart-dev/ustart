/**
 * Establece las opciones de comportamiento de graphql-shield.
 * El objeto options es proporcionado a la función: shield(permissions, options)
 * y sus atributos corresponden a los descritos en su documentación.
 * Documentación: https://github.com/maticzav/graphql-shield#options
*/
import { SERVER_MODE } from "ustart";
const shieldOptions = {
  allowExternalErrors: SERVER_MODE !== "PRODUCTION",
  debug: SERVER_MODE !== "PRODUCTION",
  // fallbackRule:
  // fallbackError:
};

export default shieldOptions;
