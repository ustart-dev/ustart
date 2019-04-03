/**
 * Establece las opciones de comportamiento de graphql-shield.
 * El objeto options es proporcionado a la función: shield(permissions, options)
 * y sus atributos corresponden a los descritos en su documentación.
 * Documentación: https://github.com/maticzav/graphql-shield#options
*/
const shieldOptions = {
  allowExternalErrors: process.env.NODE_ENV !== "production",
  debug: process.env.NODE_ENV !== "production",
  // fallbackRule:
  // fallbackError:
};

export default shieldOptions;
