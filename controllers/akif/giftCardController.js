import GiftCard from "../../models/akif/giftCardModel.js";

/**
 * Controller to handle operations related to gift cards.
 * @namespace giftCardController
 */
export const giftCardController = {
  /**
   * Adds a new gift card to the database.
   * 
   * @function addGiftCard
   * @memberof giftCardController
   * @param {Object} req - The request object.
   * @param {Object} req.body - The body containing gift card details.
   * @param {string} req.body.code - Unique code for the gift card.
   * @param {number} req.body.balance - Initial balance for the gift card.
   * @param {string} req.body.expirationDate - Expiration date of the gift card.
   * @param {Object} res - The response object.
   * @returns {Object} JSON response with a success message and the saved gift card.
   */
  addGiftCard: async (req, res) => {
    const { code, balance, expirationDate } = req.body;

    // Validate the request body
    if (!code || !balance || !expirationDate) {
      return res.status(400).json({
        message: "All fields (code, balance, expirationDate) are required",
      });
    }

    if (typeof balance !== "number" || balance <= 0) {
      return res.status(400).json({
        message: "Balance must be a positive number",
      });
    }

    if (isNaN(Date.parse(expirationDate))) {
      return res.status(400).json({
        message: "Expiration date must be a valid date",
      });
    }

    try {
      const giftCard = new GiftCard({ code, balance, expirationDate });
      const savedGiftCard = await giftCard.save();
      res.status(201).json({
        message: "Gift card added successfully",
        giftCard: savedGiftCard,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error adding gift card",
        error: error.message,
      });
    }
  },

  /**
   * Retrieves all gift cards from the database.
   * 
   * @function getGiftCards
   * @memberof giftCardController
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Array} JSON response containing a list of all gift cards.
   */
  getGiftCards: async (req, res) => {
    try {
      const giftCards = await GiftCard.find();
      res.status(200).json(giftCards);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching gift cards",
        error: error.message,
      });
    }
  },
};
