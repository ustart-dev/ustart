/**
 * Manage the creation of the database, populate it with basic data and fake data.
 * It behavior depends on the environment:
 *
 * production mode: database is not destroyed if exists (otherwise it will be
 * synchronized) and it is populated with basic data (executing populateBasicData function).
 *
 * dev mode: database is not destroyed if exists (otherwise it will be synchronized)
 * and it is populated with basic data (executing populateBasicData function).
 *
 * dev-clean mode: database is destroyed and as a safty check it must have '_test' suffix in the name.
 * It is populated with basic data and fake data (executing populateFakeData function).
 *
 * testing mode: database is destroyed and as a safty check it must have '_test' suffix in the name.
 * It is populated with basic data and testing data (executing testingMocking function).
 * This mode is intended to be use with testing, for example end to end tests.
 *
 * Notes:
 * - Only Sequelize datasources could be syncronized and destroyed.
 * - It is posibble to use ustart.setSync(false) to disable sync.
 * - These modes are temporary while ustart model generator is being implemented
 *
 * More docs on how Sequelize sync works:
 * http://docs.sequelizejs.com/manual/tutorial/models-definition.html#database-synchronization
 *
*/
import { ustart } from "../connectors/ustart";
import { DATA_PATH } from "../constants";

async function loadDatabaseData() {

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  const populateBasicData = require(`${DATA_PATH}/basicDataMocking`).populateBasicData;
  const populateFakeData = require(`${DATA_PATH}/fakeDataMocking`).populateFakeData;
  const testingMocking = require(`${DATA_PATH}/testingMocking`).testingMocking;

  if (process.env.NODE_ENV === "production") {
    // NOTE: never add { force: true } to production mode
    await ustart.syncDatasources();
    await populateBasicData();
  } else if (process.env.NODE_ENV === "development") {
    await ustart.syncDatasources();
    await populateBasicData();
  } else if (process.env.NODE_ENV === "dev-clean") {
    // NOTE: The database name must have '_test' suffix
    await ustart.syncDatasources({ force: true, match: /_test$/ });
    await populateBasicData();
    await populateFakeData();
  } else if (process.env.NODE_ENV === "testing") {
    // NOTE: The database name must have '_test' suffix
    await ustart.syncDatasources({ force: true, match: /_test$/ });
    await populateBasicData();
    await testingMocking();
  }
};

export { loadDatabaseData };
