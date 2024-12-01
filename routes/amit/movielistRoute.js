import express from 'express';
import { movieListController } from '../controllers/amit/movieListController.js';

const router = express.Router();

/**
 * @route GET /show
 * @description Fetch all movies from the database.
 * @access Public
 * @returns {Object} 200 - List of all movies
 * @returns {Object} 500 - Server error
 */
router.get('/show', movieListController.getAllMovies);

export default router;
