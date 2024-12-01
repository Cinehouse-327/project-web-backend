import mongoose from "mongoose";

/**
 * Review Schema to define the structure of the review document in the database.
 * 
 * This schema is used to store reviews for movies, and each review is associated with a user and a movie.
 * 
 * @schema Review
 */
const reviewSchema = new mongoose.Schema({
  /**
   * @field movie_id
   * @description The ObjectId of the movie that the review is associated with.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required true
   * @reference "Movie" collection
   */
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Movie", // Reference to the movie collection
  },

  /**
   * @field user_id
   * @description The ObjectId of the user who wrote the review.
   * @type {mongoose.Schema.Types.ObjectId}
   * @required true
   * @reference "User" collection
   */
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Reference to the user collection
  },

  /**
   * @field title
   * @description The title of the review.
   * @type {String}
   * @required true
   */
  title: {
    type: String,
    required: true,
  },

  /**
   * @field rating
   * @description The numerical rating given to the movie, typically between 1 and 5.
   * @type {Number}
   * @required true
   */
  rating: {
    type: Number,
    required: true,
  },

  /**
   * @field review
   * @description The actual content of the review, where the user expresses their thoughts about the movie.
   * @type {String}
   * @required true
   */
  review: {
    type: String,
    required: true,
  },
});

// Create the Mongoose model for the Review collection
const Review = mongoose.model("Review", reviewSchema);

export default Review;
