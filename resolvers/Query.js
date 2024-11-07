
export const Query = {

  hello: () => {
    return ["Hello", "World"];
  },

  products: (parent, args, { products }, infos) => products,

  product: (parent, { id }, { products }, infos) => {
    const product = products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`product with ${id} not found`);
    }
    return product;
  },

  categories: (parent, args, { categories }, infos) => categories,

  category: (parent, { id }, { categories }, infos) => {
    const category = categories.find((category) => category.id === id);
    if (!category) {
      throw new Error(`category with ${id} not found`);
    }
    return category;
  },
};
