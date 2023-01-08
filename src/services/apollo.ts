import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://sa-east-1.cdn.hygraph.com/content/clcnkalip08b701t6eb3p99o7/master",
  cache: new InMemoryCache(),
});
