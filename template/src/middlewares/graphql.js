/**
 * Exports the graphql middlewares to be loadedby the framework.
 * The array is used as defined, so priority order applies in the same order.
 * Note: graphql-shield is loaded automatically by the framework in first position,
 * all middlewares defined in the below array are concatened after graphql-shield.
 *
 * How to use graphql-middleware: https://github.com/prisma/graphql-middleware
*/
const graphqlMiddlewares = [
  // yourMiddlewares
];

export default graphqlMiddlewares;
