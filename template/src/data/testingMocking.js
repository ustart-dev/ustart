import casual from "casual";
import _ from "lodash";
import { ustart } from "ustart";

/**
 * Populates the databases at starting time only with NODE_ENV set to "TESTING".
 * Use it for testing purposes.
 */
export async function testingMocking() {
  casual.seed(249577274891086);
  // Add your testing population data here...
};
