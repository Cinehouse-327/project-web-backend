// routes/paymentRoute.js

import express from "express";
import { createPayment } from "../controllers/aman/paymentController.js";

const router = express.Router();

/**
 * Route for handling payment-related operations.
 * This route handles creating a new payment record.
 * 
 * @module PaymentRoute
 */

/**
 * POST /payments
 * 
 * This route is used to create a new payment record in the database.
 * It expects a POST request with payment information in the request body.
 * 
 * @name POST /payments
 * @function
 * @memberof module:PaymentRoute
 * @param {Object} req - The request object containing payment details.
 * @param {Object} res - The response object to send the response back to the client.
 * @returns {void} Sends a JSON response with the status of the payment creation.
 */
router.post("/payments", createPayment);

export default router;
