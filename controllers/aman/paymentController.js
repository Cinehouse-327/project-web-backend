// controllers/paymentController.js

import Payment from "../../models/aman/paymentModel.js";

/**
 * Controller for handling payment-related requests.
 * Provides functionality to create a new payment record.
 * 
 * @module createPayment
 */

/**
 * Creates a new payment record and saves it to the database.
 * 
 * This function is responsible for:
 * - Extracting payment information from the request body
 * - Creating a new payment document using the Payment model
 * - Saving the document to the MongoDB database
 * - Returning a success response with the saved payment data if successful
 * - Handling errors and returning an error message if something goes wrong
 * 
 * @async
 * @function createPayment
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing payment details.
 * @param {string} req.body.user_id - The ID of the user making the payment.
 * @param {string} req.body.booking_id - The ID of the booking being paid for.
 * @param {string} req.body.payment_status - The status of the payment (e.g., 'Successful', 'Failed').
 * @param {number} req.body.amount_paid - The amount paid by the user.
 * @param {string} req.body.payment_method - The method used for payment (e.g., 'card', 'mobile', 'cash').
 * @param {Object} res - The response object.
 * @returns {void} Sends a JSON response with the status and the payment information, or an error message.
 */
export const createPayment = async (req, res) => {
  const { user_id, booking_id, payment_status, amount_paid, payment_method } = req.body;

  try {
    // Create a new payment document using the provided payment details
    const newPayment = new Payment({
      user_id,
      booking_id,
      payment_status,
      amount_paid,
      payment_method,
    });

    // Save the new payment document to the database
    const savedPayment = await newPayment.save();

    // Send back a success response with the saved payment data
    res.status(201).json({
      message: "Payment recorded successfully",
      payment: savedPayment,
    });
  } catch (error) {
    console.error(error);
    // Send back an error response if something goes wrong
    res.status(500).json({
      message: "Error recording payment",
      error: error.message,
    });
  }
};
