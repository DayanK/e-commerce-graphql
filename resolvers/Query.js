
export const Query = {
  hello: () => {
    return ["Hello", "World"];
  },

  products: (parent, { filter }, { db }, infos) => {
    let filteredProducts = db.products;

    console.log("filteredprod", filteredProducts)

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
          db.reviews.forEach((review) => {
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

  product: (parent, { id }, { db }, infos) => {
    const product = db.products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`product with ${id} not found`);
    }
    return product;
  },

  categories: (parent, args, { db }, infos) => db.categories,

  category: ( parent, { id, filter }, { db }, infos ) => {

    // find Category by id
    const category = db.categories.find((category) => category.id === id);

    if (!category) {
      throw new Error(`category with ${id} not found`);
    }

      // Filter the products within the category based on filter criteria
    let categoryProducts = db.products.filter(
      (product) => product.categoryId === id
    );

    if (filter) {
      const { onSale, avgRating } = filter;

    // Filter by products on sale if `onSale` is defined
    if (onSale) {
        categoryProducts = categoryProducts.filter((product) => product.onSale);
      }

        // Filter by average rating if `avgRating` is provided and valid (between 1 and 5)

        if (avgRating && [1, 2, 3, 4, 5].includes(avgRating)) {

            categoryProducts = categoryProducts.filter((product) => {

                // Filter reviews for the products in this category
                const productReviews = db.reviews.filter((review) => review.productId === product.id);

                // Calculate the average rating for the product
                const avgProductRating =  productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;

                // Keep products with an average rating equal to or greater than `avgRating`
                return avgProductRating >= avgRating;
            });
        }
    }

    // Retourner la catégorie avec les produits filtrés
    return {
      ...category,
      products: categoryProducts,
    };
  },
};
