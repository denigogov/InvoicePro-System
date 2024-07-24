const { CustomError } = require("./customError");

/**
 * Middleware to handle and format errors based on the environment.
 *
 * @param {Object} error - The error object thrown during request processing.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void} Sends a response with the appropriate error details.
 */
exports.errorMiddleware = (error, req, res, next) => {
  // Determine the environment
  const isProduction = process.env.NODE_ENV_TEST === "production";
  const isDevelopment = process.env.NODE_ENV_TEST === "development";

  // Error details for development mode
  const devLog = {
    error: error, // The original error object
    message: error.message, // Error message
    errStack: error.stack, // Stack trace for debugging
  };

  // Handle errors based on the environment
  if (isProduction) {
    if (error.name === "ValidationError") {
      // Handle validation errors in production
      const errorMessage = error.details[0].message
        .replaceAll('"', "")
        .replaceAll("\\", "");

      return res.status(422).send({
        type: "Validation Error",
        message: errorMessage,
      });
    }

    // Handle custom errors in production
    if (error instanceof CustomError) {
      return res.status(error.statusCode).send({
        type: error.type,
        message: error.message,
      });
    }
    // Handle general server errors in production
    return res.status(500).send({
      type: "Internal Server Error",
      message: `something went wrong, please try again ,${error}`,
    });
  } else if (isDevelopment) {
    // In development mode, provide detailed error information
    return res.status(error.statusCode).send(devLog);
  } else {
    // Handle unexpected environments
    return res.status(500).send({
      type: "ENV",
      mesasge: "Define your ENV",
    });
  }
};
