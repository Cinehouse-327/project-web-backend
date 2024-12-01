import express from "express";
import { giftCardController } from "../controllers/giftCardController.js";

/**
 * Router for gift card-related operations.
 * @namespace giftCardRoutes
 */
const router = express.Router();

/**
 * Route to add a new gift card.
 * 
 * @name POST /giftcards/add
 * @memberof giftCardRoutes
 * @function
 * @param {string} req.body.code - Unique code for the gift card.
 * @param {number} req.body.balance - Initial balance for the gift card.
 * @param {string} req.body.expirationDate - Expiration date of the gift card.
 * @returns {Object} JSON response with success message and the added gift card.
 */
router.post("/add", giftCardController.addGiftCard);

/**
 * Route to get all gift cards.
 * 
 * @name GET /giftcards
 * @memberof giftCardRoutes
 * @function
 * @returns {Array} JSON response containing all gift cards.
 */
router.get("/", giftCardController.getGiftCards);

export default router;
