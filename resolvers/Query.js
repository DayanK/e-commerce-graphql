import { categories, products} from "../data/db.js";


export const Query = {
  hello: () => {
    return ["Hello", "World"];
  },
  products: () => {
    return products;
  },
  product: (parent, args, context, infos) => {
    const productId = args.id;
    const product = products.find((product) => product.id === productId);
    if (!productId) {
      throw new Error(`product with ${productId} not found`);
    }
    return product;
  },
  categories: () => {
    return categories;
  },
  category: (parent, args, context, infos) => {
    const { id } = args;
    const category = categories.find((category) => category.id === id);
    console.log("Parent", parent);
    console.log("args", args);
    console.log("context", context);
    console.log("infos", infos);
    if (!category) {
      throw new Error(`category with ${id} not found`);
    }
    return category;
  },
};
