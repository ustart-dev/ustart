import { Utils } from "../../src/lib/helpers/utils";

describe("Server utils", () => {
  test("datasourceToLibrary", () => {
    // Case 1: Datasource mariadb
    // Expected: return sequelize
    expect(Utils.datasourceToLibrary("mariadb")).toBe("sequelize");

    // Case 2: Datasource mssql
    // Expected: return sequelize
    expect(Utils.datasourceToLibrary("mssql")).toBe("sequelize");

    // Case 3: Datasource mysql
    // Expected: return sequelize
    expect(Utils.datasourceToLibrary("mysql")).toBe("sequelize");

    // Case 4: Datasource mysql
    // Expected: return sequelize
    expect(Utils.datasourceToLibrary("postgres")).toBe("sequelize");

    // Case 5: Datasource mysql
    // Expected: return sequelize
    expect(Utils.datasourceToLibrary("sqlite")).toBe("sequelize");

    // Case 6: Datasource mysql
    // Expected: return sequelize
    expect(Utils.datasourceToLibrary("mongodb")).toBe("mongoose");

    // Case 7: Datasource inexistence-db
    // Expected: Error "Datasource is not supported"
    expect(() => {
      Utils.datasourceToLibrary("inexistence-db")
    }).toThrow(/Datasource is not supported/);

    // Case 8: Wrong datasource type
    // Expected: Error "Wrong datasource type"
    expect(() => {
      Utils.datasourceToLibrary(10)
    }).toThrow(/Wrong datasource type/);
  });

  test("require", () => {
    // Case 1: Require an available package.
    expect(Utils.require("url")).toBeObject;

    // Case 2: Require an unavailable package.
    expect(Utils.require("nonexistent-module")).toBeNull;
  });

  test("checkPackageAvailability", () => {
    // Case 1: Require an available package.
    const r1 = Utils.require("url");
    expect(() => {
      Utils.checkPackageAvailability(r1, "url")
    }).not.toThrow(/You are trying to use a function that belongs to/);

    // Case 2: Require an unavailable package.
    const r2 = Utils.require("nonexistent-module");
    expect(() => {
      Utils.checkPackageAvailability(r2, "nonexistent-module")
    }).toThrow(/You are trying to use a function that belongs to/);
  });
});
