import { FoodItem } from '../../models/zaed/foodItemModel.js';
import { OrderFood } from '../../models/zaed/orderFoodModel.js';

export const foodController = {
  /**
   * Fetches all available food items.
   * 
   * @async
   * @function getAllFoods
   * @param {Object} req - The request object.
   * @param {Object} res - The response object containing the list of food items.
   * @returns {Object} - A response object with all food items or an error message.
   */
  getAllFoods: async (req, res) => {
    try {
      const foods = await FoodItem.find();
      res.status(200).json({ success: true, data: foods });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  /**
   * Places a new food order.
   * 
   * @async
   * @function addOrder
   * @param {Object} req - The request object containing the order details.
   * @param {Object} req.body - The body of the request containing userId, food_id, and totalprice.
   * @param {string} req.body.userId - The ID of the user placing the order.
   * @param {string} req.body.food_id - The ID of the food item being ordered.
   * @param {string} req.body.totalprice - The total price of the order.
   * @param {Object} res - The response object to send confirmation or error message.
   * @returns {Object} - A response object with order confirmation or an error message.
   */
  addOrder: async (req, res) => {
    try {
      const { userId, food_id, totalprice } = req.body;

      if (!userId || !food_id || !totalprice) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      const order = new OrderFood({ userId, food_id, totalprice });
      await order.save();

      res.status(201).json({ success: true, message: 'Order placed successfully.', data: order });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
