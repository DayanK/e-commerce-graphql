import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import { products, categories, reviews} from "./data/db.js";
import { Product } from "./resolvers/Product.js";
import { Query } from "./resolvers/Query.js";
import { Category } from "./resolvers/Category.js";



// String, Int, Float, Boolean, ID!

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
  },
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
