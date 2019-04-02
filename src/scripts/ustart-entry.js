import { GraphQLServer } from "graphql-yoga";
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from "graphql-tools";
import { shield } from "graphql-shield";
import "../../../../src/data/datasources";
import shieldOptions from "../../../../src/shield/options";
import expressMiddlewares from "../../../../src/middlewares/express";
import graphqlMiddlewares from "../../../../src/middlewares/graphql";
import {
  loadModels,
  loadTypeDefs,
  loadResolvers,
  loadPermissions,
  loadFastMocking,
  loadDatabaseData,
  loadSchemaDirectives,
  createContext,
} from "../lib/helpers";

loadModels();

loadDatabaseData();

// Se cargan y fusionan los tipos (esquema GraphQL)
const typeDefs = loadTypeDefs();

// Se cargan los resolutores
const resolvers = loadResolvers();

const permissions = loadPermissions();

const schemaDirectives = loadSchemaDirectives();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives
});

// En Modo FAST_MOCKING no se cargan los middlewares, ya que se desea que el
// backend simplemente responda con datos.
let middlewares = null;

if (process.env.FAST_MOCKING == "true") {
  const fastMocks = loadFastMocking();
  addMockFunctionsToSchema({ schema, mocks: fastMocks });
  console.log("Fast mocking enabled!");
} else {
  middlewares = [shield(permissions, shieldOptions)].concat(graphqlMiddlewares);
}

// middlewares: Se fusionan los middlewares definidos por el usuario (src/middlewares)
// con los permisos de usuario.
const graphQLServer = new GraphQLServer({
  schema,
  middlewares,
  context: createContext(),
});

// Se cargan los middleware de express
expressMiddlewares && expressMiddlewares.forEach(m => graphQLServer.express.use(m));

const port = parseInt(process.env.GRAPHQL_ENDPOINT_PORT, 10) || 4000;

const options = {
  port,
  tracing: true,
  cacheControl: true
};
graphQLServer.start(options, () => console.log(`Server is running on http://localhost:${port}`));
