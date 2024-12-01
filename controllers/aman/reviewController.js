import Review from '../../models/aman/reviewModel.js';

/**
 * Controller for handling review-related actions.
 * 
 * @module reviewController
 */
export const reviewController = {

  /**
   * Adds a new review for a movie.
   * 
   * @async
   * @function addReview
   * @param {Object} req - The request object containing review data.
   * @param {Object} req.body - The body of the request containing review details.
   * @param {string} req.body.movie_id - The ID of the movie being reviewed.
   * @param {string} req.body.user_id - The ID of the user submitting the review.
   * @param {string} req.body.title - The title of the review.
   * @param {number} req.body.rating - The rating given to the movie (e.g., 1 to 5).
   * @param {string} req.body.review - The content of the review.
   * @param {Object} res - The response object to send back the result.
   * @returns {Object} - A response object containing a success message and the newly created review.
   */
  addReview: async (req, res) => {
    const { movie_id, user_id, title, rating, review } = req.body;

    try {
      // Create a new review document using the provided data
      const newReview = new Review({
        movie_id,
        user_id,
        title,
        rating,
        review,
      });

      // Save the new review to the database
      const savedReview = await newReview.save();

      // Respond with a success message and the saved review
      res.status(201).json({
        success: true,
        message: 'Review added successfully.',
        review: savedReview,
      });
    } catch (error) {
      console.error('Error while adding review:', error);
      // Respond with an error message if an exception occurs
      res.status(500).json({
        success: false,
        message: 'Error adding review.',
        error: error.message,
      });
    }
  },

  /**
   * Retrieves all reviews for a specific movie.
   * 
   * @async
   * @function getReviews
   * @param {Object} req - The request object containing the query parameter.
   * @param {Object} req.query - The query parameters containing the movie ID.
   * @param {string} req.query.movieId - The ID of the movie for which reviews are being retrieved.
   * @param {Object} res - The response object to send back the result.
   * @returns {Object} - A response object containing the list of reviews.
   */
  getReviews: async (req, res) => {
    const { movieId } = req.query;

    try {
      // Fetch all reviews from the database matching the given movie ID
      const reviews = await Review.find({ movie_id: movieId });

      // Respond with the fetched reviews
      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Respond with an error message if an exception occurs
      res.status(500).json({
        success: false,
        message: 'Error fetching reviews.',
        error: error.message,
      });
    }
  },

  /**
   * Deletes a review by its ID.
   * 
   * @async
   * @function deleteReview
   * @param {Object} req - The request object containing review ID.
   * @param {string} req.params.id - The ID of the review to be deleted.
   * @param {Object} res - The response object to send back the result.
   * @returns {Object} - A response object containing a success or error message.
   */
  deleteReview: async (req, res) => {
    const { id } = req.params;  // Extract the review ID from the request params

    try {
      // Find and delete the review by its ID
      const deletedReview = await Review.findByIdAndDelete(id);

      if (!deletedReview) {
        // If no review was found with the given ID, return a not found error
        return res.status(404).json({
          success: false,
          message: 'Review not found.',
        });
      }

      // Respond with success if the review was deleted
      res.status(200).json({
        success: true,
        message: 'Review deleted successfully.',
      });
    } catch (error) {
      console.error('Error while deleting review:', error);
      // Respond with an error message if an exception occurs
      res.status(500).json({
        success: false,
        message: 'Error deleting review.',
        error: error.message,
      });
    }
  },
};
