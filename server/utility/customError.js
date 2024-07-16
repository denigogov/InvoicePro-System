/**
 * Class representing custom errors.
 */
class CustomError extends Error {
  constructor(message, statusCode, type) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.type =
      type ||
      (statusCode >= 400 && statusCode < 500
        ? "Client Error"
        : "Internal Server Error");

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Creates an error object for "bad request" scenarios with status 400.
   *
   * @param {string} message - A custom error message to be included in the error.
   * @returns {CustomError} A `CustomError` instance with a status code of 400 and the specified message.
   */
  static badRequestError(message) {
    return new CustomError(message, 400);
  }

  /**
   * Creates an error object for "unauthorized" scenarios with status 401.
   *
   * @param {string} [message] - A custom error message to be included in the error. If provided, this will override the default message.
   * @returns {CustomError} A `CustomError` instance with a status code of 401 and the specified message.
   */
  static unauthorizedError(message) {
    return new CustomError(message ? message : "Unauthorized access", 401);
  }

  /**
   * Creates an error object for "no content" scenarios with status 204.
   *
   * @param {string} [message] - A custom error message to be included in the error. If provided, this will override the default message.
   * @returns {CustomError} A `CustomError` instance with a status code of 204 and the specified message.
   */
  static noContentError(message) {
    return new CustomError(message ? message : "No content available", 204);
  }

  /**
   * Creates an error object for "forbidden" scenarios with status 403.
   *
   * @param {string} [message] - A custom error message to be included in the error. If provided, this will override the default message.
   * @returns {CustomError} A `CustomError` instance with a status code of 403 and the specified message.
   */
  static forbiddenError(message) {
    return new CustomError(message ? message : "Access forbidden", 204);
  }

  /**
   * Creates an error object for "not found" scenarios with status 404   @default "not found"
   *
   * @param {string} [message] - A custom error message to be included in the error. If provided, this will override the default message.
   * @param {string} [object] - An optional descriptive term (e.g., "user") to include in the error message. If `message` is not provided, the method will use this term to construct the default message.
   * @returns {CustomError} A `CustomError` instance with a status code of 404 and the specified message
   */
  static notFoundError(message, object) {
    const errorMessage = message
      ? message
      : object
      ? `${object} not found`
      : "not found";

    return new CustomError(errorMessage, 404);
  }
}

module.exports = { CustomError };
