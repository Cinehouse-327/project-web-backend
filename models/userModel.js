import mongoose from 'mongoose';

/**
 * User Schema definition for the MongoDB database.
 * This schema defines the structure of the 'User' collection with fields like name, email, password, and phone.
 * The schema also includes built-in validation and constraints for the fields.
 * 
 * @typedef {Object} User
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email address. Must be unique.
 * @property {string} password - The user's password. Must be at least 6 characters long.
 * @property {string} phone - The user's phone number.
 * @property {Date} createdAt - The timestamp when the document was created. Automatically added by Mongoose.
 * @property {Date} updatedAt - The timestamp when the document was last updated. Automatically added by Mongoose.
 */

/**
 * The User schema defines the structure of the user document in the database.
 * It includes validations and constraints on fields like name, email, password, and phone.
 * 
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
  },
  { timestamps: true }
);

/**
 * User model based on the user schema.
 * This model provides methods to interact with the 'User' collection in the database.
 * 
 * @type {mongoose.Model}
 */
export const User = mongoose.model('User', userSchema);
