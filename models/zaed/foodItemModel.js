import mongoose from 'mongoose';

/**
 * Schema for Food Items
 */
const foodItemSchema = new mongoose.Schema({
  food_name: {
    type: String,
    required: true,
  },
  food_type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export const FoodItem = mongoose.model('FoodItem', foodItemSchema);
