const Joi = require("joi");

const updateCompanyInfoSchema = Joi.object({
  companyName: Joi.string().min(3).max(40),
  country: Joi.string().min(3).max(15),
  city: Joi.string().min(3).max(20),
  street: Joi.string().min(3).max(60),
  zipcode: Joi.string()
    .pattern(new RegExp("^\\d{4,10}$"))
    .message("Zipcode must be an number between 4 and 10 digits long"),

  idNumber: Joi.string().min(4).max(20),
  bankName: Joi.string().min(3).max(20),
  iban: Joi.string().min(15).max(40),
  bic: Joi.string().min(8).max(11),
});

const validateUpdateCompanyInfo = (req, res, next) => {
  const {
    companyName,
    country,
    city,
    street,
    zipcode,
    idNumber,
    bankName,
    iban,
    bic,
  } = req.body;

  const { error } = updateCompanyInfoSchema.validate(
    {
      companyName,
      country,
      city,
      street,
      zipcode,
      idNumber,
      bankName,
      iban,
      bic,
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
  validateUpdateCompanyInfo,
};
