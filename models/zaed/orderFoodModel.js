import mongoose from 'mongoose';

/**
 * @typedef {Object} OrderFood
 * @property {mongoose.Types.ObjectId} userId - The ID of the user placing the order.
 * @property {mongoose.Types.ObjectId} food_id - The ID of the food item being ordered.
 * @property {string} totalprice - The total price of the food order.
 */

/**
 * Schema representing a food order in the system.
 * @type {mongoose.Schema<OrderFood>}
 */
const orderFoodSchema = new mongoose.Schema({
  /**
   * The ID of the user placing the order.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required
   */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  /**
   * The ID of the food item being ordered.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required
   */
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem',
    required: true,
  },

  /**
   * The total price of the food order.
   * @type {string}
   * @required
   */
  totalprice: {
    type: String,
    required: true,
  },
});

/**
 * OrderFood model for interacting with food orders in the database.
 * @type {mongoose.Model<OrderFood>}
 */
export const OrderFood = mongoose.model('OrderFood', orderFoodSchema);
