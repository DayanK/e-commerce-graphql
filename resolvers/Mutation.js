import { v4 as uuidv4 } from 'uuid';

export const Mutation = {
  addCategory: (parent, { input }, { db }, info) => {
    const { name } = input;

    // Check if category already exists
    if (db.categories.some((category) => category.name === name)) {
      return {
        success: false,
        message: `Category with name "${name}" already exists.`,
        category: null,
      };
    }

    const newCategory = {
      id: uuidv4(),
      name,
    };
    db.categories.push(newCategory);

    return {
      success: true,
      message: `Category "${name}" added successfully.`,
      category: newCategory,
    };
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, description, image, quantity, price, onSale, categoryId } =
      input;

    // Optional: Check if the provided categoryId exists
    const categoryExists = db.categories.some(
      (category) => category.id === categoryId
    );
    if (!categoryExists) {
      return {
        success: false,
        message: `Category with ID "${categoryId}" does not exist.`,
        product: null,
      };
    }

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      image,
      quantity,
      price,
      onSale,
      categoryId,
    };

    db.products.push(newProduct);

    return {
      success: true,
      message: `new product with name: "${newProduct.name}" added successfully.`,
      product: newProduct,
    };
  },

  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;

    // Check if the provided productId exists
    const productExists = db.products.some(
      (product) => product.id === productId
    );
    if (!productExists) {
      return {
        success: false,
        message: `Product with ID "${productId}" does not exist.`,
        review: null,
      };
    }

    const newReview = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    db.reviews.push(newReview);

    return {
      success: true,
      message: `new review with name: "${newReview.title}" added successfully.`,
      review: newReview,
    };
  },

  deleteCategory: (parent, { id }, { db }, info) => {
    // Check if the category exists before attempting deletion
    const categoryExists = db.categories.some((category) => category.id === id);
    if (!categoryExists) {
      return {
        success: false,
        message: `Category with id ${id} not found.`,
      };
    }

    // Remove the category from the database
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        return {
          ...product,
          categoryId: null,
        };
      } else return product;
    });
    return {
        success: true,
        message: `Category with id ${id} was successfully deleted.`,
      };
  },

  deleteProduct: (parent, { id }, { db }, info) => {
      // Check if the product exists before attempting deletion
      const productExists = db.products.some((product) => product.id === id);

      if (!productExists) {
        return {
          success: false,
          message: `Product with id ${id} not found.`,
        };
      }
    
      // Remove the product and associated reviews
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review)=> review.productId !== id);

    return {
        success: true,
        message: `Product with id ${id} was successfully deleted.`,
    };
  },

  deleteReview: (parent, { id }, { db }, info) => {
     // Check if the review exists
     const reviewExists = db.reviews.some((review) => review.id === id);

     if (!reviewExists) {
       return {
         success: false,
         message: `Review with id ${id} not found.`,
       };
     }
  
  // Remove the review from the database
  db.reviews = db.reviews.filter((review) => review.id !== id);

  return {
    success: true,
    message: `Review with id ${id} was successfully deleted.`,
  };
},
};
