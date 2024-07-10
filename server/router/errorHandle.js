class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;

    this.statusMessage =
      this.statusCode >= 400 && statusCode < 500
        ? "user side error"
        : "Internal Server Error";

    this.message = message;
  }
}

module.exports = ApiError;
