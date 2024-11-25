import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/userController.js';

const router = express.Router();

/**
 * POST /register
 * Registers a new user.
 * 
 * @function
 * @name registerUser
 * @memberof module:routes/sazzad
 * @param {express.Request} req - The HTTP request object.
 * @param {express.Response} res - The HTTP response object.
 * @returns {void} Sends a response to the client indicating success or failure of registration.
 */
router.post('/register', registerUser);

/**
 * POST /login
 * Logs in an existing user.
 * 
 * @function
 * @name loginUser
 * @memberof module:routes/sazzad
 * @param {express.Request} req - The HTTP request object containing login credentials.
 * @param {express.Response} res - The HTTP response object.
 * @returns {void} Sends a response to the client with the login status (success or error).
 */
router.post('/login', loginUser);

/**
 * POST /logout
 * Logs out a currently logged-in user.
 * 
 * @function
 * @name logoutUser
 * @memberof module:routes/sazzad
 * @param {express.Request} req - The HTTP request object.
 * @param {express.Response} res - The HTTP response object.
 * @returns {void} Sends a response to the client indicating whether logout was successful.
 */
router.post('/logout', logoutUser);

export default router;
