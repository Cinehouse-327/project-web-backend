import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

/**
 * Registers a new user.
 * 
 * @async
 * @function registerUser
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} The response object with a success message and userId.
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      userId: newUser._id,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

/**
 * Logs in a user by verifying credentials.
 * 
 * @async
 * @function loginUser
 * @param {Object} req - The request object containing user login details.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} The response object with a success message, token, and userId.
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

/**
 * Logs out a user by clearing their authentication token.
 * 
 * @function logoutUser
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} The response object with a success message.
 */
export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: 'Logout successful.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};
