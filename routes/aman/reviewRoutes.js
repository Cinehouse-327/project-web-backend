import express from "express";
import { reviewController } from "../controllers/aman/reviewController.js";

// Initialize the router for review-related routes
const router = express.Router();

/**
 * @route POST /add
 * @description Adds a new review.
 * @access Public
 * @param {Object} req - The request object, containing the review data in the body.
 * @param {Object} res - The response object to send the status or result.
 * @returns {Object} Response with status and message.
 */
router.post('/add', reviewController.addReview);

/**
 * @route GET /getreviews
 * @description Retrieves all reviews.
 * @access Public
 * @param {Object} req - The request object, no parameters required.
 * @param {Object} res - The response object containing the list of reviews.
 * @returns {Array} List of reviews in the response body.
 */
router.get('/getreviews', reviewController.getReviews);

// Export the router to be used in the main app
export default router;
