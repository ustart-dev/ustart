import cors from "cors";
import compression from "compression";

/**
 * Exports the express middlewares to be loaded by the framework.
 * The array is used as defined, so priority order applies in the same order.
 *
 * More docs: https://github.com/prisma/graphql-yoga#how-to-eject-from-the-standard-express-setup
*/
const expressMiddlewares = [
  cors(),
  compression(),
];

export default expressMiddlewares;
