import express from "express";
import { createPayment } from "../controllers/aman/paymentController.js";

const router = express.Router();

/**
 * Payment Route for handling payment-related operations.
 * This route handles creating a new payment record.
 * 
 * @module PaymentRoute
 */

/**
 * @route POST /payments
 * @description Creates a new payment record in the database.
 * @access Public
 * @param {Object} req - The request object containing payment details.
 * @param {Object} req.body - The body of the request containing payment information.
 * @param {string} req.body.user_id - The ID of the user making the payment.
 * @param {string} req.body.booking_id - The ID of the booking associated with the payment.
 * @param {string} req.body.payment_status - The status of the payment (e.g., 'Successful', 'Failed').
 * @param {number} req.body.amount_paid - The amount paid by the user.
 * @param {string} req.body.payment_method - The method used for payment (e.g., 'card', 'mobile', 'cash').
 * @param {Object} res - The response object to send the response back to the client.
 * @returns {void} Sends a JSON response with the status of the payment creation.
 */
router.post("/payments", createPayment);

export default router;
