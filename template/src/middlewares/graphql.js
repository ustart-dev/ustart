/**
 * Exporta todos los middlewares a cargar por el package graphql-middleware. El orden en el array define
 * prioridad de ejecución. De esta forma los middlewares que se añaden
 * al final del array "middlewares" se ejecutarán al final.
 * Documentación: https://github.com/prisma/graphql-middleware
 *
 * Importa y añade los middlewares necesarios para la lógica del negocio.
*/
const graphqlMiddlewares = [
  // yourMiddlewares
];

export default graphqlMiddlewares;
