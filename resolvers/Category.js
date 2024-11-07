
export const Category = {
  products: ({ id: categoryId }, { filter }, { db }, info) => {
    let filteredCategoryProducts = db.products.filter((product) => product.categoryId === categoryId);

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