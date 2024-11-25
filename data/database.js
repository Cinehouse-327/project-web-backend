import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} When the database is connected, the promise is resolved.
 */
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: 'moviedb',
    })
    .then((connection) => {
      console.log(
        `Database connected successfully with ${connection.connection.host}`
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
