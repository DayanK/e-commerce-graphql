
export const Category = {
  products: ({ id }, args, { products }, infos) => {
    return products.filter((product) => product.categoryId === id);
  },
};