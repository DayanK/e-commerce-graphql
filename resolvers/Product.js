
export const Product = {
  category: ({ categoryId }, args, { categories }) => {
    return categories.find((category) => category.id === categoryId);
  },
  reviews: ({ id }, args, { reviews }, infos) => {
    return reviews.filter((review) => review.productId === id)
  },
};
