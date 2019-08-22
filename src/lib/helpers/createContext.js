import { ustart } from "../connectors/ustart";
import { SUBSCRIPTION_PATH } from "../constants";

function createContext() {
  const pubsub = require(SUBSCRIPTION_PATH);
  
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
