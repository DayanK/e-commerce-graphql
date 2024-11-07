import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import { Product } from "./resolvers/Product.js";
import { Query } from "./resolvers/Query.js";
import { Category } from "./resolvers/Category.js";
import { Mutation } from "./resolvers/Mutation.js";
import { db } from "./data/db.js";


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product,
  }
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      db,
    };
  },
});

console.log(`🚀 Server ready at ${url}`);
