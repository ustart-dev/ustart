/**
 * Gestiona creación de la base de datos, populación de datos básicos para
 * su funcionamiento y populación de datos falsos. Soporta varios modos para
 * diferentes entornos:
 *
 * Modo PRODUCTION No se elimina nada de la BD y solo se pueblan los datos
 * básicos cuando la BD está vacía.
 *
 * Modo DEV: No se elimina nada de la BD y se pueblan con datos fake, además de los básicos.
 * cabe notar que en ese modo el mocking de datos sigue ejecutandose por lo que éstos se
 * acumularán.
 *
 * Modo DEV-CLEAN: Se destruye y construye la BD en cada reiniciado, se puebla con datos fake
 * y datos básicos. Además este modo incluye un chequeo de seguridad contra destrucciones
 * accidentales: toda BD para ser destruida debe terminar en "_test" (sin las comillas).
 *
 * Modo TESTING: Se destruye y construye la BD en cada reiniciado, se puebla con datos
 * básicos. Además este modo incluye un chequeo de seguridad contra destrucciones
 * accidentales: toda BD para ser destruida debe terminar en "_test" (sin las comillas).
 * El objetivo de este modo es ejecutar test de integración y de regresión que requieren
 * de base de datos y un endpoint graphql.
 *
 * En caso de no especificar modo alguno la única acción que se realiza es intentar sincronizar
 * la BD con el modelo.
 * Ver documentación de sequelize:
 * http://docs.sequelizejs.com/manual/tutorial/models-definition.html#database-synchronization
 *
*/
import { ustart } from "../connectors/ustart";
import {
  SERVER_MODE,
  SRC_DATA_DIR
} from "../constants";
const populateBasicData = require(`${SRC_DATA_DIR}/basicDataMocking`).populateBasicData;
const populateFakeData = require(`${SRC_DATA_DIR}/fakeDataMocking`).populateFakeData;
const testingMocking = require(`${SRC_DATA_DIR}/testingMocking`).testingMocking;

async function loadDatabaseData() {

  console.log(`Server mode: ${SERVER_MODE}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  if (SERVER_MODE === "PRODUCTION") {
    // NOTE: Jamás agregar { force: true } en modo producción
    // postgres.sync(): sincroniza los modelos de sequelize que no están creados en la
    // BD, al añadir
    await ustart.syncDatasources();
    await populateBasicData();
  } else if (SERVER_MODE === "DEV") {
    await ustart.syncDatasources();
    await populateBasicData();
  } else if (SERVER_MODE === "DEV-CLEAN") {
    // Toda BD para ser destruida debe terminar en "_test" (sin las comillas).
    await ustart.syncDatasources({ force: true, match: /_test$/ });
    await populateBasicData();
    await populateFakeData();
  } else if (SERVER_MODE === "TESTING") {
    // Toda BD para ser destruida debe terminar en "_test" (sin las comillas).
    await ustart.syncDatasources({ force: true, match: /_test$/ });
    await populateBasicData();
    await testingMocking();
  }
};

export { loadDatabaseData };
