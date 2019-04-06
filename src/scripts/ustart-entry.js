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

const typeDefs = loadTypeDefs();

const resolvers = loadResolvers();

const permissions = loadPermissions();

const schemaDirectives = loadSchemaDirectives();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives
});

// FAST_MOCKING mode does not load graphql middlewares, because the idea is
// that the backend responde with simple data.
let middlewares = null;

if (process.env.FAST_MOCKING == "true") {
  const fastMocks = loadFastMocking();
  addMockFunctionsToSchema({ schema, mocks: fastMocks });
  console.log("Fast mocking enabled!");
} else {
  // permissions middlewares are loaded first, otherwise they will not work correctly.
  middlewares = [shield(permissions, shieldOptions)].concat(graphqlMiddlewares);
}

const graphQLServer = new GraphQLServer({
  schema,
  middlewares,
  context: createContext(),
});

// It loads the express middlewares
expressMiddlewares && expressMiddlewares.forEach(m => graphQLServer.express.use(m));

graphQLServer.start(
  yogaOptions.options,
  () => console.log(`Server is running on http://localhost:${yogaOptions.options.port}`)
);
