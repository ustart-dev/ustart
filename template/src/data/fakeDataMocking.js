/**
 * Popula la BD de pruebas con datos falsos
*/
import casual from "casual";
import _ from "lodash";
import bcrypt from "bcrypt-nodejs";
import { ustart } from "ustart";

// Esta función sólo es ejecutada en modo DEV-CLEAN
export async function populateFakeData() {
  casual.seed(64524967274856263);
  // Se procede a poblar la BD de pruebas
  _.times(10, async () => {
    // Add here your fake database data
  });
};
