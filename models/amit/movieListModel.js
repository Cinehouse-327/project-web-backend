import mongoose from 'mongoose';

/**
 * Movie Schema definition
 * @typedef {Object} Movie
 * @property {string} name - The name of the movie.
 * @property {mongoose.Types.ObjectId} movieId - The unique identifier for the movie.
 * @property {string} year - The year the movie was released.
 * @property {string} category - The category or genre of the movie.
 * @property {string} type - The type of the movie (e.g., "Feature", "Short").
 * @property {string} imageLink - The URL to the movie's image or poster.
 */

/**
 * Schema definition for Movie in the database.
 * @type {mongoose.Schema<Movie>}
 */
const movieSchema = new mongoose.Schema({
  /**
   * The name of the movie.
   * @type {string}
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * The unique identifier for the movie.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  /**
   * The year the movie was released.
   * @type {string}
   */
  year: {
    type: String,
    required: true,
  },

  /**
   * The category or genre of the movie.
   * @type {string}
   */
  category: {
    type: String,
    required: true,
  },

  /**
   * The type of the movie (e.g., "Feature", "Short").
   * @type {string}
   */
  type: {
    type: String,
    required: true,
  },

  /**
   * The URL to the movie's image or poster.
   * @type {string}
   */
  imageLink: {
    type: String,
    required: true,
  },
});

/**
 * The Movie model which is used to interact with the 'movies' collection in MongoDB.
 * @type {mongoose.Model<Movie>}
 */
export const MovieList = mongoose.model('MovieList', movieSchema);
