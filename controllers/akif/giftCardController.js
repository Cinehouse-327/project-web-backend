import GiftCard from "../../models/akif/giftCardModel.js";

// Controller to handle gift card-related actions
export const giftCardController = {
  
  /**
   * @route POST /add
   * @description Adds a new gift card.
   * @param {Object} req - The request object containing gift card data in the body.
   * @param {Object} res - The response object to send status or result back to the client.
   * @returns {Object} Response containing the status and the newly created gift card.
   */
  addGiftCard: async (req, res) => {
    const { code, value, expiration_date } = req.body;

    try {
      // Create a new gift card document using the data provided in the request body
      const newGiftCard = new GiftCard({
        code,
        value,
        expiration_date,
        status: "active", // New gift cards are active by default
      });

      // Save the new gift card to the database
      const savedGiftCard = await newGiftCard.save();

      // Respond with success and the saved gift card
      res.status(201).json({
        message: "Gift card added successfully",
        giftCard: savedGiftCard,
      });
    } catch (error) {
      console.error("Error while adding gift card:", error);
      // Respond with an error message if something goes wrong
      res.status(500).json({
        message: "Error adding gift card",
        error: error.message,
      });
    }
  },

  /**
   * @route GET /getgiftcards
   * @description Retrieves all gift cards.
   * @param {Object} req - The request object containing the query parameters (optional).
   * @param {Object} res - The response object that will contain the list of gift cards.
   * @returns {Array} An array of gift cards from the database.
   */
  getGiftCards: async (req, res) => {
    try {
      // Fetch all gift cards from the database
      const giftCards = await GiftCard.find();

      // Respond with the list of gift cards
      res.status(200).json({ giftCards });
    } catch (error) {
      console.error("Error fetching gift cards:", error);
      // Respond with an error message if something goes wrong
      res.status(500).json({
        message: "Error fetching gift cards",
        error: error.message,
      });
    }
  },

  /**
   * @route PUT /use/:code
   * @description Marks a gift card as used.
   * @param {Object} req - The request object containing the code parameter in the URL.
   * @param {Object} res - The response object that will return the updated gift card.
   * @returns {Object} The updated gift card with the "used" status.
   */
  useGiftCard: async (req, res) => {
    const { code } = req.params;

    try {
      // Find the gift card by code and update its status to "used"
      const updatedGiftCard = await GiftCard.findOneAndUpdate(
        { code, status: "active" }, // Only mark as used if it's active
        { status: "used" },
        { new: true }
      );

      if (!updatedGiftCard) {
        return res.status(404).json({ message: "Gift card not found or already used." });
      }

      // Respond with the updated gift card
      res.status(200).json({
        message: "Gift card marked as used",
        giftCard: updatedGiftCard,
      });
    } catch (error) {
      console.error("Error using gift card:", error);
      res.status(500).json({
        message: "Error using gift card",
        error: error.message,
      });
    }
  },
};
