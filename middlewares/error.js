/**
 * Custom error handler class that extends the built-in Error class.
 * This class allows for setting a specific status code along with the error message.
 */
class ErrorHandler extends Error {
    /**
     * Creates an instance of ErrorHandler.
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code associated with the error.
     */
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  /**
   * Middleware for handling errors in Express.
   * This middleware captures errors thrown by other middleware and sends a standardized error response.
   * 
   * @param {Error} err - The error object passed to the middleware.
   * @param {Object} req - The request object from Express.
   * @param {Object} res - The response object from Express.
   * @param {Function} next - The next middleware function in the chain.
   * 
   * @returns {Object} - The JSON response with the error details.
   */
  export const errorMiddlewares = (err, req, res, next) => {
    // Set default values for message and status code if not provided
    err.message = err.message || 'Internal Server Error';
    err.statusCode = err.statusCode || 500;
  
    // Return the error details in the response
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
  
  export default ErrorHandler;
  