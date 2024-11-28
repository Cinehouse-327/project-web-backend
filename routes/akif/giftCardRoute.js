import express from "express";
import { giftCardController } from "../controllers/sazzad/giftCardController.js";

// Initialize the router for gift card-related routes
const router = express.Router();

/**
 * @route POST /add
 * @description Adds a new gift card.
 * @access Public
 * @param {Object} req - The request object, containing the gift card data in the body.
 * @param {Object} res - The response object to send the status or result.
 * @returns {Object} Response with status and message.
 */
router.post('/add', giftCardController.addGiftCard);

/**
 * @route GET /getgiftcards
 * @description Retrieves all gift cards.
 * @access Public
 * @param {Object} req - The request object, no parameters required.
 * @param {Object} res - The response object containing the list of gift cards.
 * @returns {Array} List of gift cards in the response body.
 */
router.get('/getgiftcards', giftCardController.getGiftCards);

/**
 * @route PUT /use/:code
 * @description Marks a gift card as used.
 * @access Public
 * @param {Object} req - The request object, containing the code parameter in the URL.
 * @param {Object} res - The response object containing the updated gift card.
 * @returns {Object} The updated gift card after marking it as used.
 */
router.put('/use/:code', giftCardController.useGiftCard);

// Export the router to be used in the main app
export default router;
