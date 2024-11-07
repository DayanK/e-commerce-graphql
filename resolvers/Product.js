
export const Product = {
  category: ({ categoryId }, args, { db }) => {
    return db.categories.find((category) => category.id === categoryId);
  },
  reviews: ({ id }, args, { db }, infos) => {
    return db.reviews.filter((review) => review.productId === id)
  },
};
