import Review from "../../models/aman/reviewModel.js";

// Controller to handle review-related actions
export const reviewController = {
  
  /**
   * @route POST /add
   * @description Adds a new review for a movie.
   * @param {Object} req - The request object containing review data in the body.
   * @param {Object} res - The response object to send status or result back to the client.
   * @returns {Object} Response containing the status and the newly created review.
   */
  addReview: async (req, res) => {
    const { movie_id, user_id, title, rating, review } = req.body;

    try {
      // Create a new review document using the data provided in the request body
      const newReview = new Review({
        movie_id,
        user_id,
        title,
        rating,
        review,
      });

      // Save the new review to the database
      const savedReview = await newReview.save();

      // Respond with success and the saved review
      res.status(201).json({
        message: "Review added successfully",
        review: savedReview,
      });
    } catch (error) {
      console.error("Error while adding review:", error);
      // Respond with an error message if something goes wrong
      res.status(500).json({
        message: "Error adding review",
        error: error.message,
      });
    }
  },

  /**
   * @route GET /getreviews
   * @description Retrieves all reviews for a specific movie.
   * @param {Object} req - The request object containing the movieId query parameter.
   * @param {Object} res - The response object that will contain the list of reviews.
   * @returns {Array} An array of reviews associated with the provided movie ID.
   */
  getReviews: async (req, res) => {
    const { movieId } = req.query; // Get movieId from query parameters

    try {
      // Fetch all reviews from the database that match the movieId
      const reviews = await Review.find({ "movie_id": movieId });

      // Respond with the reviews for the specified movie
      res.status(200).json({ reviews });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // Respond with an error message if something goes wrong
      res.status(500).json({
        message: "Error fetching reviews",
        error: error.message,
      });
    }
  },
};
