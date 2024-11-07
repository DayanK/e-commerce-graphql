
export const Category = {
  products: ({ id: categoryId }, { filter }, { products }, info) => {
    let filteredCategoryProducts = products.filter((product) => product.categoryId === categoryId);

    if (filter) {
      if (filter.onSale === true) {
        filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
          return product.onSale;
        });
      }
    }

    return filteredCategoryProducts;
  },
};