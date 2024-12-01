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
      res.status(200).json({ foods });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * Places an order for food.
   * 
   * @async
   * @function addOrder
   * @param {Object} req - The request object containing order details.
   * @param {Object} res - The response object confirming the order or an error message.
   * @returns {Object} - A response object with order confirmation or error message.
   */
  addOrder: async (req, res) => {
    const { userId, food_id, totalprice } = req.body;

    try {
      const newOrder = new OrderFood({ userId, food_id, totalprice });
      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
