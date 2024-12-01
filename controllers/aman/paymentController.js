import Payment from "../../models/aman/paymentModel.js";

/**
 * Controller for handling payment-related actions.
 * 
 * @module paymentController
 */
export const paymentController = {

  /**
   * Creates a new payment record and saves it to the database.
   * 
   * This function performs the following tasks:
   * - Extracts payment information from the request body.
   * - Creates a new payment document using the Payment model.
   * - Saves the payment document to the MongoDB database.
   * - Responds with a success message and the saved payment data.
   * - Handles errors and returns an error message if something goes wrong.
   * 
   * @async
   * @function createPayment
   * @param {Object} req - The request object containing payment data.
   * @param {Object} req.body - The body of the request containing payment details.
   * @param {string} req.body.user_id - The ID of the user making the payment.
   * @param {string} req.body.booking_id - The ID of the booking being paid for.
   * @param {string} req.body.payment_status - The status of the payment (e.g., 'Successful', 'Failed').
   * @param {number} req.body.amount_paid - The amount paid by the user.
   * @param {string} req.body.payment_method - The method used for payment (e.g., 'card', 'mobile', 'cash').
   * @param {Object} res - The response object to send back the result.
   * @returns {Object} - A response object containing a success message and the saved payment data.
   */
  createPayment: async (req, res) => {
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

      // Respond with a success message and the saved payment data
      res.status(201).json({
        message: "Payment recorded successfully.",
        payment: savedPayment,
      });
    } catch (error) {
      console.error('Error while recording payment:', error);
      // Respond with an error message if an exception occurs
      res.status(500).json({
        message: "Error recording payment.",
        error: error.message,
      });
    }
  },
};
