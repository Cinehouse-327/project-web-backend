import { reviewController } from '../../controllers/aman/reviewController.js';
import Review from '../../models/aman/reviewModel.js';

// Mock Mongoose model for testing
jest.mock('../../models/aman/reviewModel.js');

/**
 * Suite of tests for the `reviewController` functions.
 * These tests cover the addReview, getReviews, and deleteReview functions.
 */
describe('Review Controller Tests', () => {
  
  /**
   * Clears mocks after each test to ensure no state is carried over.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test suite for the addReview controller function.
   */
  describe('addReview', () => {

    /**
     * Test case for successfully adding a review.
     * It mocks the `Review.save` method and checks if the response is correct.
     */
    it('should add a review successfully', async () => {
      const req = {
        body: {
          movie_id: 'abcdef123456789012345678',
          user_id: '1234567890abcdef12345678',
          title: 'Great Movie!',
          rating: 5,
          review: 'I loved this movie. It was amazing!',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockReview = {
        _id: 'mockReviewId',
        ...req.body,
      };

      // Mock the save method to resolve successfully
      Review.prototype.save = jest.fn().mockResolvedValue(mockReview);

      await reviewController.addReview(req, res);

      // Assertions to ensure the save method was called and correct response was sent
      expect(Review.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Review added successfully.',
        review: mockReview,
      });
    });

    /**
     * Test case for handling errors while adding a review.
     * It mocks the `Review.save` method to reject with an error and checks the response.
     */
    it('should return 500 if there is an error while adding review', async () => {
      const req = {
        body: {
          movie_id: 'abcdef123456789012345678',
          user_id: '1234567890abcdef12345678',
          title: 'Great Movie!',
          rating: 5,
          review: 'I loved this movie. It was amazing!',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the save method to reject with an error
      Review.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

      await reviewController.addReview(req, res);

      // Assertions to ensure the error response is sent
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error adding review.',
        error: 'Database error',
      });
    });
  });

  /**
   * Test suite for the getReviews controller function.
   */
  describe('getReviews', () => {

    /**
     * Test case for successfully fetching reviews for a specific movie.
     * It mocks the `Review.find` method and checks if the correct reviews are returned.
     */
    it('should return reviews for a specific movie', async () => {
      const req = {
        query: {
          movieId: 'abcdef123456789012345678',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockReviews = [
        { movie_id: req.query.movieId, user_id: 'user1', title: 'Great movie!', rating: 5, review: 'Loved it!' },
        { movie_id: req.query.movieId, user_id: 'user2', title: 'Not bad', rating: 3, review: 'It was okay.' },
      ];

      // Mock the find method to return mock reviews
      Review.find.mockResolvedValue(mockReviews);

      await reviewController.getReviews(req, res);

      // Assertions to ensure the correct response is returned
      expect(Review.find).toHaveBeenCalledWith({ movie_id: req.query.movieId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        reviews: mockReviews,
      });
    });

    /**
     * Test case for handling errors while fetching reviews.
     * It mocks the `Review.find` method to reject with an error and checks the response.
     */
    it('should return 500 if there is an error fetching reviews', async () => {
      const req = {
        query: {
          movieId: 'abcdef123456789012345678',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the find method to reject with an error
      Review.find.mockRejectedValue(new Error('Database error'));

      await reviewController.getReviews(req, res);

      // Assertions to ensure the error response is sent
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error fetching reviews.',
        error: 'Database error',
      });
    });
  });

  /**
   * Test suite for the deleteReview controller function.
   */
  describe('deleteReview', () => {

    /**
     * Test case for successfully deleting a review.
     * It mocks the `Review.findByIdAndDelete` method and checks if the review is deleted.
     */
    it('should delete a review successfully', async () => {
      const req = {
        params: {
          id: 'abcdef123456789012345678',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockDeletedReview = {
        _id: req.params.id,
        movie_id: 'abcdef123456789012345678',
        user_id: '1234567890abcdef12345678',
        title: 'Great Movie!',
        rating: 5,
        review: 'I loved this movie. It was amazing!',
      };

      // Mock the findByIdAndDelete method to return the mock deleted review
      Review.findByIdAndDelete.mockResolvedValue(mockDeletedReview);

      await reviewController.deleteReview(req, res);

      // Assertions to ensure the review was deleted and correct response was sent
      expect(Review.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Review deleted successfully.',
      });
    });

    /**
     * Test case for handling "not found" error when trying to delete a review.
     * It mocks the `Review.findByIdAndDelete` method to return null.
     */
    it('should return 404 if review to delete is not found', async () => {
      const req = {
        params: {
          id: 'abcdef123456789012345678',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the findByIdAndDelete method to return null (not found)
      Review.findByIdAndDelete.mockResolvedValue(null);

      await reviewController.deleteReview(req, res);

      // Assertions to ensure the "not found" response is sent
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Review not found.',
      });
    });

    /**
     * Test case for handling errors while deleting a review.
     * It mocks the `Review.findByIdAndDelete` method to reject with an error.
     */
    it('should return 500 if there is an error while deleting review', async () => {
      const req = {
        params: {
          id: 'abcdef123456789012345678',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the findByIdAndDelete method to reject with an error
      Review.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await reviewController.deleteReview(req, res);

      // Assertions to ensure the error response is sent
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error deleting review.',
        error: 'Database error',
      });
    });
  });
});
