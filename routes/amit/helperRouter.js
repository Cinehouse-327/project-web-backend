import express from 'express';
import { 
  createSupportQuery, 
  updateQueryResponse, 
  deleteQuery 
} from '../../controllers/amit/helpSupportController.js';

const router = express.Router();

/**
 * @route POST /help-support
 * @description Route to create a new support query.
 * @param {Object} req - The request object containing user ID and question.
 * @param {Object} res - The response object with query confirmation or an error message.
 * @returns {Object} 201 - Query created successfully.
 * @returns {Object} 400 - Error message if required fields are missing.
 * @returns {Object} 500 - Server error message.
 */
router.post('/help-support', createSupportQuery);


/**
 * @route PATCH /help-support
 * @description Route to update a query with a response from the support team.
 * @param {Object} req - The request object containing query ID and the response.
 * @param {Object} res - The response object with updated query data or an error message.
 * @returns {Object} 200 - Query updated successfully.
 * @returns {Object} 400 - Error message if required fields are missing.
 * @returns {Object} 404 - Error message if query not found.
 * @returns {Object} 500 - Server error message.
 */
router.patch('/help-support', updateQueryResponse);

/**
 * @route DELETE /help-support/:queryId
 * @description Route to delete a specific query.
 * @param {Object} req - The request object containing the query ID in params.
 * @param {Object} res - The response object confirming deletion or an error message.
 * @returns {Object} 200 - Query deleted successfully.
 * @returns {Object} 400 - Error message if query ID is missing.
 * @returns {Object} 404 - Error message if query not found.
 * @returns {Object} 500 - Server error message.
 */
router.delete('/help-support/:queryId', deleteQuery);

export default router;
