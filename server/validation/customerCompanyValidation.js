const Joi = require("joi");

const customerCompanySchema = Joi.object({
  customerName: Joi.string().min(3).max(50).required(),
  country: Joi.string().min(3).max(30).required(),
  idNumber: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(30),
  street: Joi.string().min(3).max(100),
  zipcode: Joi.string().max(10),
});

const validateCustomerCompany = (req, res, next) => {
  const { customerName, country, city, street, zipcode, idNumber } = req.body;

  const { error } = customerCompanySchema.validate(
    {
      customerName,
      country,
      city,
      street,
      zipcode,
      idNumber,
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
  validateCustomerCompany,
};
