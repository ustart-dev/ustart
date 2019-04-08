/**
 * Establishes the behavior options for graphql-shield.
 * shieldOptions object is passed to shield as the second parameter: shield(permissions, options)
 * and its attributes are the same.
 *
 * More doc: https://github.com/maticzav/graphql-shield#options
*/
const shieldOptions = {
  allowExternalErrors: process.env.NODE_ENV !== "production",
  debug: process.env.NODE_ENV !== "production",
  // fallbackRule:
  // fallbackError:
};

export default shieldOptions;
