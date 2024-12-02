import { MovieList } from "../../models/amit/movieListModel.js";

/**
 * Controller for handling movie list related requests.
 * @module movieListController
 */
export const movieListController = {
  /**
   * Get all movies from the MovieList collection.
   *
   * This function queries the database to retrieve all movies and sends them as a response
   * with a status code of 200. In case of any errors, a 500 status code and the error message are returned.
   *
   * @async
   * @function getAllMovies
   * @param {Object} req - The request object, typically containing query parameters, headers, etc.
   * @param {Object} res - The response object used to send a response back to the client.
   * @returns {Promise<void>} A promise that resolves with no value. The response is sent directly to the client.
   *
   * @example
   * // Calling this will return all movies in the database
   * movieListController.getAllMovies(req, res);
   */
  getAllMovies: async (req, res) => {
    try {
      const movies = await MovieList.find();
      if (!movies) {
        return res
          .status(404)
          .json({ success: false, message: "No movies found" });
      }
      res.status(200).json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};