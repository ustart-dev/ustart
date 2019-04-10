import Sequelize from "sequelize";
import url from "url";
import { Schema } from "mongoose";
import { ustart } from "../../src/lib/connectors/ustart";

beforeAll(async () => {
  ustart.connect(process.env.PG_URI);
  ustart.connect(process.env.MONGO_URI, { useNewUrlParser: true });
});

describe("Ustart tests", () => {
  test("connect", () => {
    // Case 1: Datasource postgres
    // Expected: created an instance of sequelize in the postgres field
    expect(ustart.datasources.postgres).toBeInstanceOf(Sequelize);

    // Case 2: Datasource mongodb
    // Expected: created an instance of sequelize in the postgres field
    // expect(ustart.datasources.mongodb).toBeInstanceOf(Sequelize);
    // console.log(`instance of mongodb: ${typeof ustart.datasources.mongodb}`);
    expect(typeof ustart.datasources.mongodb).toBe("object");
  });

  test("defineModel", async () => {
    // Case 1: Define a model in the postgres datasource
    // Expected: create an instance of the Kat model
    ustart.defineModel("postgres", "kat", {
      name: { type: Sequelize.STRING },
      bell: { type: Sequelize.BOOLEAN },
    });
    expect(ustart.models.kat).toBeInstanceOf(Function);

    // Case 2: Define a model in the mongodb datasource
    // Expected: create an instance of the Dog model
    ustart.defineModel("mongodb", "dog", new Schema ({
      name: String,
      color: String,
    }));
    expect(ustart.models.dog).toBeInstanceOf(Function);
    // console.log(`instance of dog: ${typeof ustart.models.dog}`);
    // console.log(ustart.models.dog);
  });

  test.skip("syncDatasources", async () => {
    // syncDatasources
  });
});
