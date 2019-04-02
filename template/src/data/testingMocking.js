/**
 * Popula la BD de pruebas con datos falsos diseñados para las pruebas
 * automáticas de integración y regresión.
*/
import casual from "casual";
import _ from "lodash";
import { ustart } from "ustart";

// Esta función sólo es ejecutada en modo TESTING.
export async function testingMocking() {
  casual.seed(249577274891086);
  // Add your testing population data here...
};
