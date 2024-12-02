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
const giftCardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required."],
      unique: true,
      trim: true,
      maxlength: [20, "Code cannot exceed 20 characters."],
    },
    balance: {
      type: Number,
      required: [true, "Balance is required."],
      min: [0, "Balance cannot be negative."],
    },
    expirationDate: {
      type: Date,
      required: [true, "Expiration date is required."],
      validate: {
        validator: function (value) {
          return value > new Date(); // Ensures the expiration date is in the future
        },
        message: "Expiration date must be in the future.",
      },
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
    collection: 'giftcards', // Specify the collection name here
  }
);

/**
 * Pre-save hook to ensure code uniqueness and format.
 */
giftCardSchema.pre("save", async function (next) {
  try {
    const existingGiftCard = await mongoose.models.GiftCard.findOne({ code: this.code });
    if (existingGiftCard && existingGiftCard._id.toString() !== this._id.toString()) {
      throw new Error("Gift card code must be unique.");
    }
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Mongoose model for GiftCard.
 * @type {mongoose.Model<GiftCard>}
 */
const GiftCard = mongoose.model("GiftCard", giftCardSchema);

export default GiftCard;
