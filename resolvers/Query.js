
export const Query = {
  hello: () => {
    return ["Hello", "World"];
  },

  products: (parent, { filter }, { products, reviews}, infos) => {
    let filteredProducts = products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });

          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },

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
