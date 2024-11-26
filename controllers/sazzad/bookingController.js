import mongoose from 'mongoose';
import { Booking } from '../../models/sazzad/bookingModel.js';
import { User } from '../../models/userModel.js';
import { MovieList } from '../../models/sazzad/movieListModel.js';

/**
 * Handles user booking for a movie.
 * 
 * @async
 * @function userBooking
 * @param {Object} req - The request object containing the booking data.
 * @param {Object} req.body - The body of the request containing booking information.
 * @param {string} req.body.userId - The ID of the user making the booking.
 * @param {string} req.body.movieId - The ID of the movie being booked.
 * @param {string} req.body.showTime - The time of the movie show.
 * @param {string} req.body.date - The date of the movie show.
 * @param {Object} req.body.seats - An object representing selected seats (optional).
 * @param {number} req.body.totalPrice - The total price of the booking.
 * @param {Object} res - The response object to send back the result.
 * @returns {Object} - A response object with booking confirmation or error message.
 */
export const userBooking = async (req, res) => {
  try {
    const { userId, movieId, showTime, date, seats, totalPrice } = req.body;

    console.log('Booking request data:', req.body);

    if (!userId || !movieId || !showTime || !date || totalPrice === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const movie = await MovieList.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    const newBooking = new Booking({
      user_id: userId,
      movie_id: movieId,
      show_time: showTime,
      show_date: date,
      seats: seats || {},
      total_price: totalPrice,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully.',
      booking: newBooking,
      bookingId: newBooking._id,
    });
  } catch (error) {
    console.error('Error during booking:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

/**
 * Retrieves the seat availability for a specific movie show.
 * 
 * @async
 * @function getSeatAvailability
 * @param {Object} req - The request object containing the query data.
 * @param {Object} req.query - The query parameters containing movie ID, date, and show time.
 * @param {string} req.query.movieId - The ID of the movie.
 * @param {string} req.query.date - The date of the movie show.
 * @param {string} req.query.time - The time of the movie show.
 * @param {Object} res - The response object to send back the availability status.
 * @returns {Object} - A response object with seat availability status.
 */
export const getSeatAvailability = async (req, res) => {
  try {
    const { movieId, date, time } = req.query;

    if (!movieId || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const bookings = await Booking.find({
      movie_id: movieId,
      show_date: date,
      show_time: time,
    });

    let bookedSeats = [];

    bookings.forEach((booking) => {
      if (booking.seats) {
        bookedSeats.push(...booking.seats);
      }
    });

    const seatsStatus = Array.from({ length: 30 }, (_, i) => 
      bookedSeats.includes(i) ? 'booked' : 'available'
    );

    res.status(200).json({ seats: seatsStatus });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
