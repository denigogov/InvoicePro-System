const Joi = require("joi");

const paramErrorMessage =
  "We detected an unauthorized attempt to access or modify data. Your request could not be processed. If you believe this is an error or need assistance, please contact our support team";

const updateInvoiceStatusSchema = Joi.object({
  id: Joi.number().positive().integer().min(1).max(10).required().messages({
    "number.base": paramErrorMessage,
    "number.max": paramErrorMessage,
    "number.required": paramErrorMessage,
  }),
  statusName: Joi.string().min(2).max(10).messages({
    "string.min": "Must have at least 2 characters",
    "string.max": "Must have max 10 characters",
  }),
});

const validateUpdateInvoiceStatus = (req, res, next) => {
  const { id } = req.params;
  const { statusName } = req.body;

  const { error } = updateInvoiceStatusSchema.validate(
    {
      id,
      statusName,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};
module.exports = {
  validateUpdateInvoiceStatus,
};
