/**
 * Exporta los middlewares de express a cargar en el servidor.
 * El orden en el array define la prioridad de carga. De esta forma los middlewares que se añaden
 * al final del array se cargarán al final.
 * Documentación: https://github.com/prisma/graphql-yoga#how-to-eject-from-the-standard-express-setup
 *
 * Importa y añade los middlewares necesarios para la lógica del negocio.
*/
import cors from "cors";
import compression from "compression";

// Se define CORS personalizado
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || true,
//   methods: ["GET", "PUT", "POST", "OPTIONS"],
//   credentials: true,
//   maxAge: 3600
// };
// cors(corsOptions);

const expressMiddlewares = [
  cors(),
  compression(),
];

export default expressMiddlewares;
