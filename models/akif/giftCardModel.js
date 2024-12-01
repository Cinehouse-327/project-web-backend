import mongoose from "mongoose";

/**
 * Schema definition for the GiftCard model.
 * Represents a gift card with a unique code, balance, and expiration date.
 * 
 * @typedef {Object} GiftCard
 * @property {String} code - Unique code for the gift card.
 * @property {Number} balance - Monetary value on the gift card.
 * @property {Date} expirationDate - Expiration date of the gift card.
 */
const giftCardSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

/**
 * Mongoose model for GiftCard.
 * @type {mongoose.Model<GiftCard>}
 */
const GiftCard = mongoose.model("GiftCard", giftCardSchema);

export default GiftCard;
