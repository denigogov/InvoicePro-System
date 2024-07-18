/**
 * Wraps a controller function in a try-catch block to handle errors.
 *
 * @param {Function} controller - The controller function to be wrapped.
 * @returns {Function} An async function that handles errors and passes them to the next middleware.
 */
exports.handleTryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    return next(err);
  }
};

/**
 * Handles the response based on the presence of data.
 *
 * @param {Array} data - The data to be evaluated.
 * @param {Function} successCallback - The callback to execute if data is present.
 * @param {Function} errorCallback - The callback to execute if no data is found.
 */
exports.handleResponse = (data, successCallback, errorCallback) => {
  if (data.length | data.affectedRows) {
    successCallback();
  } else {
    errorCallback();
  }
};
