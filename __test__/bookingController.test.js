import { userBooking, getSeatAvailability } from '../controllers/sazzad/bookingController.js';
import { Booking } from '../models/sazzad/bookingModel.js';
import { User } from '../models/sazzad/userModel.js';
import { MovieList } from '../models/sazzad/movieListModel.js';


jest.mock('../models/sazzad/bookingModel.js');
jest.mock('../models/sazzad/userModel.js');
jest.mock('../models/sazzad/movieListModel.js');

/**
 * Test suite for the Booking Controller functions.
 */
describe('Booking Controller Tests', () => {
  /**
   * Clear all mocks after each test case to ensure isolation between tests.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test suite for the `userBooking` function.
   */
  describe('userBooking', () => {
    /**
     * Test case to check if a booking is created successfully.
     * Verifies that the required services are called and a success response is returned.
     */
    it('should create a booking successfully', async () => {
      const req = {
        body: {
          userId: '1234567890abcdef12345678',
          movieId: 'abcdef123456789012345678',
          showTime: '18:30',
          date: '2024-12-01',
          seats: [1, 2, 3],
          totalPrice: 300,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = { _id: req.body.userId, name: 'John Doe' };
      const mockMovie = { _id: req.body.movieId, name: 'Inception' };
      const mockBooking = { _id: 'mockBookingId', ...req.body };

      User.findById.mockResolvedValue(mockUser);
      MovieList.findById.mockResolvedValue(mockMovie);
      Booking.prototype.save = jest.fn().mockResolvedValue(mockBooking);

      await userBooking(req, res);

      expect(User.findById).toHaveBeenCalledWith(req.body.userId);
      expect(MovieList.findById).toHaveBeenCalledWith(req.body.movieId);
      expect(Booking.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Booking confirmed successfully.',
        booking: mockBooking,
        bookingId: mockBooking._id,
      });
    });

    /**
     * Test case to check if the request returns a 400 error when required fields are missing.
     */
    it('should return 400 if required fields are missing', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
    });

    /**
     * Test case to check if the request returns a 404 error when the user is not found.
     */
    it('should return 404 if user is not found', async () => {
      const req = {
        body: {
          userId: '1234567890abcdef12345678',
          movieId: 'abcdef123456789012345678',
          showTime: '18:30',
          date: '2024-12-01',
          totalPrice: 300,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findById.mockResolvedValue(null);

      await userBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found.' });
    });

    /**
     * Test case to check if the request returns a 404 error when the movie is not found.
     */
    it('should return 404 if movie is not found', async () => {
      const req = {
        body: {
          userId: '1234567890abcdef12345678',
          movieId: 'abcdef123456789012345678',
          showTime: '18:30',
          date: '2024-12-01',
          totalPrice: 300,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findById.mockResolvedValue({ _id: req.body.userId });
      MovieList.findById.mockResolvedValue(null);

      await userBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found.' });
    });
  });

  /**
   * Test suite for the `getSeatAvailability` function.
   */
  describe('getSeatAvailability', () => {
    /**
     * Test case to verify seat availability for a given movie, date, and time.
     */
    it('should return seat availability', async () => {
      const req = {
        query: {
          movieId: 'abcdef123456789012345678',
          date: '2024-12-01',
          time: '18:30',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockBookings = [
        { seats: [1, 2, 3] },
        { seats: [4, 5] },
      ];

      Booking.find.mockResolvedValue(mockBookings);

      await getSeatAvailability(req, res);

      expect(Booking.find).toHaveBeenCalledWith({
        movie_id: req.query.movieId,
        show_date: req.query.date,
        show_time: req.query.time,
      });

      const expectedSeatsStatus = Array.from({ length: 30 }, (_, i) =>
        [1, 2, 3, 4, 5].includes(i) ? 'booked' : 'available'
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ seats: expectedSeatsStatus });
    });

    /**
     * Test case to check if the request returns a 400 error when required query fields are missing.
     */
    it('should return 400 if required query fields are missing', async () => {
      const req = { query: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getSeatAvailability(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
    });

    /**
     * Test case to handle server errors gracefully.
     * Simulates a database error and ensures a proper error message is returned.
     */
    it('should handle server errors gracefully', async () => {
      const req = {
        query: {
          movieId: 'abcdef123456789012345678',
          date: '2024-12-01',
          time: '18:30',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Booking.find.mockRejectedValue(new Error('Database error'));

      await getSeatAvailability(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Server error.',
        error: 'Database error',
      });
    });
  });
});
