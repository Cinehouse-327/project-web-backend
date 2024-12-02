import mongoose from "mongoose";

/**
 * @typedef {Object} Watchlist
 * @property {mongoose.Types.ObjectId} userId - The ID of the user who owns the watchlist.
 * @property {Object} movie - The details of the movie added to the watchlist.
 */

/**
 * Schema representing a user's watchlist.
 * @type {mongoose.Schema<Watchlist>}
 */
const watchlistSchema = new mongoose.Schema({
  /**
   * The ID of the user who owns the watchlist.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required
   */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  /**
   * The details of the movie added to the watchlist.
   * @type {Object}
   * @required
   */
  movie: {
    type: Object,
    required: true,
  },
});

/**
 * Watchlist model for interacting with watchlist data in the database.
 * @type {mongoose.Model<Watchlist>}
 */
export const Watchlist = mongoose.model("Watchlist", watchlistSchema);
