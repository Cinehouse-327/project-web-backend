import mongoose from 'mongoose';
import { HelpSupport } from '../../models/helpSupportModel.js';
import { User } from '../../models/userModel.js';

/**
 * Handles the creation of a new help & support query.
 * 
 * @async
 * @function createSupportQuery
 * @param {Object} req - The request object containing query data.
 * @param {Object} req.body - The body of the request containing query information.
 * @param {string} req.body.userId - The ID of the user raising the query.
 * @param {string} req.body.question - The user's question or issue.
 * @param {Object} res - The response object to send back the result.
 * @returns {Object} - A response object with the query confirmation or an error message.
 */
export const createSupportQuery = async (req, res) => {
  try {
    const { userId, question } = req.body;

    console.log('New support query request:', req.body);

    if (!userId || !question) {
      return res.status(400).json({ message: 'User ID and question are required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newQuery = new HelpSupport({ userId, question });
    await newQuery.save();

    res.status(201).json({
      success: true,
      message: 'Query submitted successfully.',
      query: newQuery,
    });
  } catch (error) {
    console.error('Error during query creation:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

/**
 * Retrieves all queries submitted by a specific user.
 * 
 * @async
 * @function getUserQueries
 * @param {Object} req - The request object containing the user's ID.
 * @param {Object} req.params - The parameters containing the user ID.
 * @param {string} req.params.userId - The ID of the user whose queries are being retrieved.
 * @param {Object} res - The response object to send back the result.
 * @returns {Object} - A response object with the list of queries or an error message.
 */
export const getUserQueries = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log('Fetching queries for user:', userId);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const queries = await HelpSupport.find({ userId });
    res.status(200).json({
      success: true,
      queries,
    });
  } catch (error) {
    console.error('Error fetching user queries:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};


/**
 * Deletes a specific query.
 * 
 * @async
 * @function deleteQuery
 * @param {Object} req - The request object containing the query ID.
 * @param {Object} req.params - The parameters containing the query ID.
 * @param {string} req.params.queryId - The ID of the query to delete.
 * @param {Object} res - The response object to send back the result.
 * @returns {Object} - A response object with the deletion confirmation or an error message.
 */
export const deleteQuery = async (req, res) => {
  try {
    const { queryId } = req.params;

    console.log('Deleting query with ID:', queryId);

    if (!queryId) {
      return res.status(400).json({ message: 'Query ID is required.' });
    }

    const deletedQuery = await HelpSupport.findByIdAndDelete(queryId);

    if (!deletedQuery) {
      return res.status(404).json({ message: 'Query not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Query deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
