import express from "express";
import { watchlistController } from "../../controllers/zaed/watchlistController.js";

const router = express.Router();

/**
 * @route POST /add
 * @description Add a movie to the user's watchlist.
 * @param {Object} req - The request object containing movie details to be added to the watchlist.
 * @param {Object} res - The response object to confirm successful addition or handle errors.
 * @returns {Object} 200 - A success message and the updated watchlist.
 * @returns {Object} 400 - Error message if the movie cannot be added.
 */
router.post("/add", watchlistController.addToWatchlist);

/**
 * @route GET /
 * @description Retrieve the user's entire watchlist.
 * @param {Object} req - The request object for fetching watchlist data.
 * @param {Object} res - The response object containing the user's watchlist.
 * @returns {Object} 200 - The list of movies in the user's watchlist.
 * @returns {Object} 404 - Error message if the watchlist is empty.
 */
router.get("/", watchlistController.getWatchlist);

/**
 * @route DELETE /remove/:movieId
 * @description Remove a specific movie from the user's watchlist.
 * @param {Object} req - The request object containing the ID of the movie to be removed.
 * @param {Object} res - The response object confirming the removal or handling errors.
 * @returns {Object} 200 - A success message and the updated watchlist.
 * @returns {Object} 400 - Error message if the movie cannot be removed.
 */
router.delete("/remove/:movieId", watchlistController.removeFromWatchlist);

export default router;
