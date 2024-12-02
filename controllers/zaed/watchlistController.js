import { Watchlist } from "../../models/zaed/watchlistModel.js";


/**
 * Controller for handling watchlist-related actions.
 * 
 * @module watchlistController
 */
export const watchlistController = {
  /**
   * Adds a movie to the user's watchlist.
   * 
   * @async
   * @function addToWatchlist
   * @param {Object} req - The request object containing the user ID and movie details.
   * @param {Object} req.body - The body of the request containing userId and movie data.
   * @param {string} req.body.userId - The ID of the user adding the movie.
   * @param {Object} req.body.movie - The movie details to be added.
   * @param {Object} res - The response object to send the result.
   * @returns {Object} - A response object with confirmation or error message.
   */
  addToWatchlist: async (req, res) => {
    const { userId, movie } = req.body;

    try {
      const existing = await Watchlist.findOne({ userId, "movie._id": movie._id });
      if (existing) {
        return res.status(400).json({ message: "Movie already in watchlist" });
      }

      const newEntry = new Watchlist({ userId, movie });
      await newEntry.save();
      res.status(201).json({ message: "Movie added to watchlist" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * Retrieves the user's watchlist.
   * 
   * @async
   * @function getWatchlist
   * @param {Object} req - The request object containing query parameters.
   * @param {string} req.query.userId - The ID of the user whose watchlist is retrieved.
   * @param {Object} res - The response object containing the watchlist or error message.
   * @returns {Object} - A response object with the user's watchlist or an error message.
   */
  getWatchlist: async (req, res) => {
    const { userId } = req.query;

    try {
      const movies = await Watchlist.find({ userId });
      res.status(200).json({ movies });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * Removes a movie from the user's watchlist.
   * 
   * @async
   * @function removeFromWatchlist
   * @param {Object} req - The request object containing the movie ID to be removed.
   * @param {string} req.params.movieId - The ID of the movie to remove from the watchlist.
   * @param {Object} res - The response object confirming the removal or error message.
   * @returns {Object} - A response object confirming the removal or an error message.
   */
  removeFromWatchlist: async (req, res) => {
    try {
      await Watchlist.findByIdAndDelete(req.params.movieId);
      res.status(200).json({ message: "Movie removed from watchlist" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
