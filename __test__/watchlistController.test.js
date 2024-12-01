import { watchlistController } from '../../controllers/zaed/watchlistController.js';
import { Watchlist } from '../../models/zaed/watchlistModel.js';

// Mock Mongoose model
jest.mock('../../models/zaed/watchlistModel.js');

describe('Watchlist Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addToWatchlist', () => {
    it('should add a movie to the watchlist successfully', async () => {
      const req = {
        body: {
          userId: '1234567890abcdef12345678',
          movie: { _id: 'abcdef123456789012345678', title: 'Sample Movie' },
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Watchlist.findOne.mockResolvedValue(null);
      Watchlist.prototype.save = jest.fn().mockResolvedValue(true);

      await watchlistController.addToWatchlist(req, res);

      expect(Watchlist.findOne).toHaveBeenCalledWith({ userId: req.body.userId, "movie._id": req.body.movie._id });
      expect(Watchlist.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie added to watchlist' });
    });

    it('should return 400 if the movie is already in the watchlist', async () => {
      const req = {
        body: {
          userId: '1234567890abcdef12345678',
          movie: { _id: 'abcdef123456789012345678', title: 'Sample Movie' },
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Watchlist.findOne.mockResolvedValue(true);

      await watchlistController.addToWatchlist(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie already in watchlist' });
    });

    it('should return 500 if there is an error while adding the movie', async () => {
      const req = {
        body: {
          userId: '1234567890abcdef12345678',
          movie: { _id: 'abcdef123456789012345678', title: 'Sample Movie' },
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Watchlist.findOne.mockRejectedValue(new Error('Database error'));

      await watchlistController.addToWatchlist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  describe('getWatchlist', () => {
    it('should retrieve the user’s watchlist successfully', async () => {
      const req = { query: { userId: '1234567890abcdef12345678' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockMovies = [
        { _id: '1', movie: { title: 'Movie 1' } },
        { _id: '2', movie: { title: 'Movie 2' } },
      ];

      Watchlist.find.mockResolvedValue(mockMovies);

      await watchlistController.getWatchlist(req, res);

      expect(Watchlist.find).toHaveBeenCalledWith({ userId: req.query.userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ movies: mockMovies });
    });

    it('should return 500 if there is an error retrieving the watchlist', async () => {
      const req = { query: { userId: '1234567890abcdef12345678' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Watchlist.find.mockRejectedValue(new Error('Database error'));

      await watchlistController.getWatchlist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  describe('removeFromWatchlist', () => {
    it('should remove a movie from the watchlist successfully', async () => {
      const req = { params: { movieId: 'abcdef123456789012345678' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Watchlist.findByIdAndDelete.mockResolvedValue(true);

      await watchlistController.removeFromWatchlist(req, res);

      expect(Watchlist.findByIdAndDelete).toHaveBeenCalledWith(req.params.movieId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie removed from watchlist' });
    });

    it('should return 500 if there is an error removing the movie', async () => {
      const req = { params: { movieId: 'abcdef123456789012345678' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Watchlist.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await watchlistController.removeFromWatchlist(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});
