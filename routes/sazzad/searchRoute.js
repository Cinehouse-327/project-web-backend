import express from 'express';
import { getMovies } from '../controllers/sazzad/searchController.js';

const router = express.Router();

/**
 * @route GET /movies
 * @description Route to fetch a list of movies.
 * @param {Object} req - The request object which may contain filters or query parameters for movie search.
 * @param {Object} res - The response object containing the list of movies.
 * @returns {Object} 200 - A list of movies.
 * @returns {Object} 500 - Error message if there's an issue retrieving the movies.
 */
router.get('/movies', getMovies);

export default router;
