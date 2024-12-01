import express from 'express';
import { userBooking, getSeatAvailability } from '../controllers/sazzad/bookingController.js';

const router = express.Router();

/**
 * @route POST /bookings
 * @description User booking route to handle booking requests.
 * @param {Object} req - The request object containing user booking details.
 * @param {Object} res - The response object to send booking confirmation.
 * @returns {Object} 200 - A success message and booking confirmation data.
 * @returns {Object} 400 - Error message if booking details are invalid.
 */
router.post('/bookings', userBooking);

/**
 * @route GET /bookings/seats
 * @description Route to fetch seat availability information.
 * @param {Object} req - The request object which may contain filters for seat availability.
 * @param {Object} res - The response object containing seat availability details.
 * @returns {Object} 200 - A list of available seats.
 * @returns {Object} 404 - Error message if no seats are available.
 */
router.get('/bookings/seats', getSeatAvailability);


export default router;
