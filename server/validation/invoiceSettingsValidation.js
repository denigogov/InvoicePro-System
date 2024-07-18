const Joi = require("joi");
const { handleTryCatch } = require("../utility/tryCatch");

const updateInvoiceSettingsSchema = Joi.object({
  tax: Joi.number().positive().allow(0).less(101).messages({
    "number.less": "The tax rate cannot be more than 100%",
  }),
  discount: Joi.number().positive().allow(0).less(101).messages({
    "number.less": "The discount rate cannot be more than 100%",
  }),
});

const validateUpdateInvoiceSettings = handleTryCatch((req, res, next) => {
  const { tax, discount } = req.body;

  const { error } = updateInvoiceSettingsSchema.validate(
    {
      tax,
      discount,
    },
    { abortEarly: false }
  );

  if (error) {
    throw error;
  } else {
    next();
  }
});

module.exports = {
  validateUpdateInvoiceSettings,
};
