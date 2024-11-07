import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import { Product } from "./resolvers/Product.js";
import { Query } from "./resolvers/Query.js";
import { Category } from "./resolvers/Category.js";
import { categories, products, reviews} from "./data/db.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
  }
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      sayHello: () => console.log("Hello"),
      categories,
      products,
      reviews
    };
  },
});

console.log(`🚀 Server ready at ${url}`);
