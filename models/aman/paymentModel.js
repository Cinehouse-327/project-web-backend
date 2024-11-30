import mongoose from "mongoose";

/**
 * Payment Schema defines the structure for payment records in the database.
 * It references both the User and Booking models to associate the payment
 * with a specific user and booking.
 *
 * @typedef {Object} Payment
 * @property {mongoose.Schema.Types.ObjectId} user_id - The ID of the user making the payment, referenced from the "User" model.
 * @property {mongoose.Schema.Types.ObjectId} booking_id - The ID of the booking associated with the payment, referenced from the "Booking" model.
 * @property {String} payment_status - The status of the payment (e.g., 'Successful', 'Failed').
 * @property {String} payment_method - The method used for payment (e.g., 'card', 'mobile', 'cash').
 */
const paymentSchema = new mongoose.Schema(
  {
    /**
     * The user ID who is making the payment.
     * This field references the "User" model.
     * @type {mongoose.Schema.Types.ObjectId}
     * @required
     */
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you are using a reference to the User model
      required: true,
    },
    
    /**
     * The booking ID associated with the payment.
     * This field references the "Booking" model.
     * @type {mongoose.Schema.Types.ObjectId}
     * @required
     */
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", // Assuming you are using a reference to the Booking model
      required: true, // This makes the field required
    },

    /**
     * The status of the payment.
     * Examples: 'Successful', 'Failed', etc.
     * @type {String}
     * @required
     */
    payment_status: {
      type: String,
      required: true,
    },

    /**
     * The method used for payment.
     * Examples: 'card', 'mobile', 'cash'.
     * @type {String}
     * @required
     */
    payment_method: {
      type: String,
      required: true, // e.g., 'card', 'mobile', 'cash'
    },
  },
);

/**
 * Payment Model
 * The Payment model is used to interact with the 'payments' collection in the MongoDB database.
 * 
 * @type {mongoose.Model<Payment>}
 */
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
