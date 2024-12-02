import { createSupportQuery, getUserQueries, deleteQuery } from '../controllers/amit/helpSupportController.js';
import { HelpSupport } from '../models/amit/helpSupportModel.js';
import { User } from '../models/userModel.js';
import mongoose from 'mongoose';

jest.mock('../models/amit/helpSupportModel.js');
jest.mock('../models/userModel.js');

describe('Help & Support Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSupportQuery', () => {
    it('should return 400 if userId or question is missing', async () => {
      mockReq.body = { userId: '', question: '' };
      await createSupportQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User ID and question are required.' });
    });

    it('should return 404 if user is not found', async () => {
      mockReq.body = { userId: 'nonexistentUserId', question: 'How to reset my password?' };
      User.findById.mockResolvedValue(null);  // Simulating user not found

      await createSupportQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found.' });
    });

    it('should create a new query and return 201', async () => {
      const mockUser = { _id: 'userId123', name: 'John Doe' };
      const mockQuery = { userId: 'userId123', question: 'How to reset my password?' };
      
      mockReq.body = mockQuery;
      User.findById.mockResolvedValue(mockUser);
      HelpSupport.prototype.save.mockResolvedValue(mockQuery);

      await createSupportQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Query submitted successfully.',
        query: mockQuery,
      });
    });

    it('should handle errors and return 500', async () => {
      mockReq.body = { userId: 'userId123', question: 'How to reset my password?' };
      User.findById.mockRejectedValue(new Error('Database error'));

      await createSupportQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Server error.', error: 'Database error' });
    });
  });

  describe('getUserQueries', () => {
    it('should return 400 if userId is missing', async () => {
      mockReq.params = { userId: '' };
      await getUserQueries(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User ID is required.' });
    });

    it('should return 200 and list of queries for a user', async () => {
      mockReq.params = { userId: 'userId123' };
      const mockQueries = [{ userId: 'userId123', question: 'How to reset my password?' }];
      HelpSupport.find.mockResolvedValue(mockQueries);

      await getUserQueries(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        queries: mockQueries,
      });
    });

    it('should handle errors and return 500', async () => {
      mockReq.params = { userId: 'userId123' };
      HelpSupport.find.mockRejectedValue(new Error('Database error'));

      await getUserQueries(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Server error.', error: 'Database error' });
    });
  });

  describe('deleteQuery', () => {
    it('should return 400 if queryId is missing', async () => {
      mockReq.params = { queryId: '' };
      await deleteQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Query ID is required.' });
    });

    it('should return 404 if query is not found', async () => {
      mockReq.params = { queryId: 'nonexistentQueryId' };
      HelpSupport.findByIdAndDelete.mockResolvedValue(null);  // Simulating query not found

      await deleteQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Query not found.' });
    });

    it('should delete query and return 200', async () => {
      mockReq.params = { queryId: 'queryId123' };
      const mockDeletedQuery = { _id: 'queryId123', userId: 'userId123', question: 'How to reset my password?' };
      HelpSupport.findByIdAndDelete.mockResolvedValue(mockDeletedQuery);

      await deleteQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Query deleted successfully.',
      });
    });

    it('should handle errors and return 500', async () => {
      mockReq.params = { queryId: 'queryId123' };
      HelpSupport.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await deleteQuery(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Server error.', error: 'Database error' });
    });
  });
});
