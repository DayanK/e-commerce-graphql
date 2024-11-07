import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: [String!]!
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: AddCategoryInput!) : AddCategoryResult!
    addProduct(input: AddProductInput!) : AddProductResult!
    addReview(input: AddReviewInput!) : AddReviewsResult!
    deleteCategory(id: ID!): DeleteCategoryResult!
    deleteProduct(id: ID!): DeleteProductResult!
    deleteReview(id: ID!): DeleteReviewResult!
  }

  type AddCategoryResult {
    success: Boolean!
    message: String!
    category: Category
  }

  type AddProductResult {
    success: Boolean!
    message: String!
    product: Product
  }

  type AddReviewsResult {
    success: Boolean!
    message: String!
    review: Reviews
  }

  type DeleteCategoryResult {
    success: Boolean!
    message: String!
    category: Boolean!
  }

  type DeleteProductResult {
    success: Boolean!
    message: String!
  }
  
  type DeleteReviewResult {
    success: Boolean!
    message: String!
  }

  type Product {
    id: String!
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews: [Reviews!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Reviews {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating:Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: String!
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
`;