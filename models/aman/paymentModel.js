import mongoose from "mongoose";

/**
 * Payment Schema defines the structure for payment records in the database.
 * It references both the User and Booking models to associate the payment
 * with a specific user and booking.
 * 
 * @schema Payment
 */
const paymentSchema = new mongoose.Schema({
  /**
   * @field user_id
   * @description The ObjectId of the user making the payment.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required true
   * @reference "User" collection
   */
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user collection
    required: true,
  },

  /**
   * @field booking_id
   * @description The ObjectId of the booking associated with the payment.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required true
   * @reference "Booking" collection
   */
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking", // Reference to the booking collection
    required: true,
  },

  /**
   * @field payment_status
   * @description The status of the payment (e.g., 'Successful', 'Failed').
   * @type {String}
   * @required true
   */
  payment_status: {
    type: String,
    required: true,
  },

  /**
   * @field payment_method
   * @description The method used for payment (e.g., 'card', 'mobile', 'cash').
   * @type {String}
   * @required true
   */
  payment_method: {
    type: String,
    required: true,
  },
});

/**
 * Payment Model
 * 
 * The Payment model is used to interact with the 'payments' collection in the MongoDB database.
 * 
 * @type {mongoose.Model<Payment>}
 */
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
