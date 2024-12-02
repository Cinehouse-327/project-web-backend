import express from 'express';
import { foodController } from '../../controllers/zaed/foodController.js';

const router = express.Router();

/**
 * @route GET /foods
 * @description Retrieve the list of all available food items.
 * @param {Object} req - The request object for fetching food items.
 * @param {Object} res - The response object containing the list of food items.
 * @returns {Object} 200 - A list of food items.
 * @returns {Object} 404 - Error message if no food items are available.
 */
router.get('/foods', foodController.getAllFoods);

/**
 * @route POST /order
 * @description Place a new order for food.
 * @param {Object} req - The request object containing order details.
 * @param {Object} res - The response object confirming the order placement or handling errors.
 * @returns {Object} 200 - A success message with the order details.
 * @returns {Object} 400 - Error message if the order cannot be processed.
 */
router.post('/order', foodController.addOrder);

export default router;
