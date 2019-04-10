import { GraphQLClient } from "graphql-request";

/**
 * Helper class for testing purposes. A class instance is exported, loaded in
 * Jest setup and exposed globally.
*/
export default class TestingUtils {

  constructor() {
    this.graphqlUrl = process.env.GRAPHQL_ENDPOINT_URL || "http://127.0.0.1";
    this.port = parseInt(process.env.GRAPHQL_ENDPOINT_PORT, 10) || 4000;
    this.endPoint = `${this.graphqlUrl}:${this.port}`;
  }

  /**
   * Returns an instance of GraphQLClient setup with URL and port provided by the environment.
  */
  getGraphQLClient(options = {}) {
    return new GraphQLClient(this.endPoint, { ...options });
  };
};
