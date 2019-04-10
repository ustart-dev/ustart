const emptyQuery = `
query {
  _EMPTY_
}
`;

let client = null;

beforeAll(async () => {
  client = TestingUtils.getGraphQLClient();
});

describe("Example of test", () => {
  test("empty query", async () => {
    await expect(
      client.request(emptyQuery)
    ).resolves.toMatchObject({
      "_EMPTY_": null
    });
  });
});
