import mongoose from 'mongoose';

/**
 * @typedef {Object} Booking
 * @property {mongoose.Types.ObjectId} userId - The ID of the user who made the booking.
 * @property {mongoose.Types.ObjectId} movieId - The ID of the movie being booked.
 * @property {string} showTime - The time of the movie showing.
 * @property {string} showDate - The date of the movie showing.
 * @property {number[]} seats - Array of seat numbers booked.
 * @property {number} totalPrice - The total price of the booking.
 */

/**
 * Schema representing a booking in the system.
 * @type {mongoose.Schema<Booking>}
 */
const bookingSchema = new mongoose.Schema({
  /**
   * The ID of the user who made the booking.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required
   */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  /**
   * The ID of the movie being booked.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required
   */
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  
  /**
   * The time of the movie showing.
   * @type {string}
   * @required
   */
  showTime: {
    type: String,
    required: true
  },
  
  /**
   * The date of the movie showing.
   * @type {string}
   * @required
   */
  showDate: {
    type: String,
    required: true
  },
  
  /**
   * The array of seat numbers that have been booked.
   * @type {number[]}
   * @required
   */
  seats: { 
    type: [Number],
    required: true
  },
  
  /**
   * The total price of the booking.
   * @type {number}
   * @required
   */
  totalPrice: {
    type: Number,
    required: true
  }
});

/**
 * Booking model for interacting with bookings in the database.
 * @type {mongoose.Model<Booking>}
 */
export const Booking = mongoose.model('Booking', bookingSchema);
