import { MovieList } from '../../models/sazzad/movieListModel.js';

/**
 * Controller to get the list of all movies from the database.
 * 
 * @async
 * @function getMovies
 * @param {Object} req - The request object, containing any query parameters or data sent by the client.
 * @param {Object} res - The response object, used to send the result or error back to the client.
 * @returns {Promise<void>} Sends a response with either a list of movies or an error message.
 * 
 * @throws {Error} If fetching the movies fails, an error message will be sent in the response.
 */
export const getMovies = async (req, res) => {
  try {
    const moviesList = await MovieList.find();
      res.status(200).json({ success: true, data: moviesList });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch movies.', error: error.message });
  }
};
