import mongoose from "mongoose";

/**
 * GiftCard Schema to define the structure of the gift card document in the database.
 * 
 * This schema is used to store information about gift cards, including their value and status.
 * 
 * @schema GiftCard
 */
const giftCardSchema = new mongoose.Schema({
  /**
   * @field code
   * @description The unique code of the gift card.
   * @type {String}
   * @required true
   * @unique true
   */
  code: {
    type: String,
    required: true,
    unique: true,
  },

  /**
   * @field value
   * @description The monetary value of the gift card.
   * @type {Number}
   * @required true
   */
  value: {
    type: Number,
    required: true,
  },

  /**
   * @field status
   * @description The current status of the gift card (active or used).
   * @type {String}
   * @required true
   * @enum ["active", "used"]
   */
  status: {
    type: String,
    required: true,
    enum: ["active", "used"],
    default: "active",
  },

  /**
   * @field expiration_date
   * @description The expiration date of the gift card.
   * @type {Date}
   * @required true
   */
  expiration_date: {
    type: Date,
    required: true,
  },
});

// Create the Mongoose model for the GiftCard collection
const GiftCard = mongoose.model("GiftCard", giftCardSchema);

export default GiftCard;
