/**
 * Custom error class for API errors.
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {string} type - The type of the error (e.g., "Validation Error").
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} message - A descriptive message for the error.
   */
  constructor(type, statusCode, message) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.errorMessage = message;
  }

  /**
   * First need to call the class or use static method and top of it call it!
   * Logs the error details to the console.
   */
  logError() {
    console.error(
      `Error: ${this.message}, Type: ${this.type}, Status Code: ${this.statusCode}, ${this.name}
`
    );
  }

  /**
   * Static method to create a validation error instance.
   * @param {string} message - The error message.
   * @returns {ApiError} - An instance of ApiError with type "Validation Error" and status code 422.
   */
  static validationError(message) {
    return new ApiError("Validation Error", 422, message);
  }

  static internalServerError(message) {
    return new ApiError("Internal Error", 500, message);
  }

  static createCustomError(type, statusCode, message) {
    return new ApiError();
  }
}

const errorHandleMiddelware = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    // Format the error message
    const errorMessage = error.details[0].message
      .replaceAll('"', "")
      .replaceAll("\\", "");

    // calling the method from the class !
    const apiError = ApiError.validationError(errorMessage);
    apiError.logError();
    return res.status(422).send(apiError);
  }
  // const apiError = ApiError.internalServerError(error.message);
  // return res.status(500).send(apiError);
};

module.exports = { ApiError, errorHandleMiddelware };
