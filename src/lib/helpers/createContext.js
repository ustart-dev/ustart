import { ustart } from "../connectors/ustart";
import { SUBSCRIPTION_DIR } from "../constants";

const pubsub = require(SUBSCRIPTION_DIR);

function createContext() {
  const context = {
    ustart
  };

  if (pubsub) {
    context.pubsub = pubsub.default;
  }

  return (req) => ({
    req: req.request,
    ...context
  });
}

export { createContext };
