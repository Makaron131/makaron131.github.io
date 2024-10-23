import { GraphQLClient } from "graphql-request";
import { TOKEN_A, TOKEN_B } from "./constants";

const END_POINT = `https://api.github.com/graphql`;

const graphQLClient = new GraphQLClient(END_POINT, {
  headers: {
    authorization: `Bearer ${TOKEN_A}${TOKEN_B}`,
  },
});

export async function request<T>(query: string) {
  return await graphQLClient.request<T>(query);
}
