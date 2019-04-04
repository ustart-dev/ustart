require("dotenv").config();
const { GraphQLServer } = require("graphql-yoga");
const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");
const { shield } = require("graphql-shield");
const {
  SRC_PATH,
  DATA_PATH,
  CONFIG_PATH
} = require("../lib/constants");
require(`${DATA_PATH}/datasources`);
const shieldOptions = require(`${SRC_PATH}/shield/options`).default;
const expressMiddlewares = require(`${SRC_PATH}/middlewares/express`).default;
const graphqlMiddlewares = require(`${SRC_PATH}/middlewares/graphql`).default;
const {
  loadModels,
  loadTypeDefs,
  loadResolvers,
  loadPermissions,
  loadFastMocking,
  loadDatabaseData,
  loadSchemaDirectives,
  createContext,
} = require("../lib/helpers");
const yogaOptions = require(`${CONFIG_PATH}/yoga`);

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

graphQLServer.start(
  yogaOptions.options,
  () => console.log(`Server is running on http://localhost:${yogaOptions.options.port}`)
);
