const Joi = require("joi");

// const customerName = {
//   min: "Customer Name should be min 3 letters",
//   max: "Customer Name should be max 50 letters",
// };
// const country = {
//   min: "Country should be min 3 letters",
//   max: "Country Name should be max 30 letters",
// };
// const IDNumber = {
//   min: "ID Number should be min 3 letters",
//   max: "ID Number should be max 50 letters",
// };
// const city = {
//   min: "City should be min 3 letters",
//   max: "City should be max 30 letters",
// };
// const street = {
//   min: "Street should be min 3 letters",
//   max: "Street should be max 100 letters",
// };
// const zipcode = {
//   max: "Zipcode should be max 10 letters",
// };

// const customerCompanySchema = Joi.object({
//   customerName: Joi.string().min(3).max(50).required().messages({
//     "string.min": customerName.min,
//     "string.max": customerName.max,
//   }),
//   country: Joi.string().min(3).max(30).required().messages({
//     "string.min": country.min,
//     "string.max": country.max,
//   }),
//   idNumber: Joi.string().min(3).max(50).required().messages({
//     "string.min": IDNumber.min,
//     "string.max": IDNumber.max,
//   }),
//   city: Joi.string().min(3).max(30).messages({
//     "string.min": city.min,
//     "string.max": city.max,
//   }),
//   street: Joi.string().min(3).max(100).messages({
//     "string.min": street.min,
//     "string.max": street.max,
//   }),
//   zipcode: Joi.string().max(10).messages({
//     "string.max": zipcode.max,
//   }),
// });

// const updateCustomerCompanySchema = Joi.object({
//   customerName: Joi.string().min(3).max(50).messages({
//     "string.min": customerName.min,
//     "string.max": customerName.max,
//   }),
//   country: Joi.string().min(3).max(30).messages({
//     "string.min": country.min,
//     "string.max": country.max,
//   }),
//   idNumber: Joi.string().min(3).max(50).messages({
//     "string.min": IDNumber.min,
//     "string.max": IDNumber.max,
//   }),
//   city: Joi.string().min(3).max(30).messages({
//     "string.min": city.min,
//     "string.max": city.max,
//   }),
//   street: Joi.string().min(3).max(100).messages({
//     "string.min": street.min,
//     "string.max": street.max,
//   }),
//   zipcode: Joi.string().max(10).messages({
//     "string.max": zipcode.max,
//   }),
// });

// const validateCustomerCompany = (req, res, next) => {
//   const { customerName, country, city, street, zipcode, idNumber } = req.body;

//   const { error } = updateCustomerCompanySchema.validate(
//     {
//       customerName,
//       country,
//       city,
//       street,
//       zipcode,
//       idNumber,
//     },
//     { abortEarly: false }
//   );

//   if (error) {
//     res.status(422).json({ validationErrors: error.details });
//   } else {
//     next();
//   }
// };

// const validateUpdateCustomerCompany = (req, res, next) => {
//   const { customerName, country, city, street, zipcode, idNumber } = req.body;

//   const { error } = customerCompanySchema.validate(
//     {
//       customerName,
//       country,
//       city,
//       street,
//       zipcode,
//       idNumber,
//     },
//     { abortEarly: false }
//   );

//   if (error) {
//     res.status(422).json({ validationErrors: error.details });
//   } else {
//     next();
//   }
// };

// module.exports = {
//   validateCustomerCompany,
//   validateUpdateCustomerCompany,
// };
const validationMessages = {
  customerName: {
    min: "Customer Name should be min 3 letters",
    max: "Customer Name should be max 50 letters",
  },
  country: {
    min: "Country should be min 3 letters",
    max: "Country Name should be max 30 letters",
  },
  idNumber: {
    min: "ID Number should be min 3 letters",
    max: "ID Number should be max 50 letters",
  },
  city: {
    min: "City should be min 3 letters",
    max: "City should be max 30 letters",
  },
  street: {
    min: "Street should be min 3 letters",
    max: "Street should be max 100 letters",
  },
  zipcode: { max: "Zipcode should be max 10 letters" },
};

const createSchema = (requiredFields = []) => {
  const schema = {
    customerName: Joi.string().min(3).max(50).messages({
      "string.min": validationMessages.customerName.min,
      "string.max": validationMessages.customerName.max,
      "any.required": "Customer Name is required",
    }),
    country: Joi.string().min(3).max(30).messages({
      "string.min": validationMessages.country.min,
      "string.max": validationMessages.country.max,
      "any.required": "Country is required",
    }),
    idNumber: Joi.string().min(3).max(50).messages({
      "string.min": validationMessages.idNumber.min,
      "string.max": validationMessages.idNumber.max,
      "any.required": "ID Number is required",
    }),
    city: Joi.string().min(3).max(30).messages({
      "string.min": validationMessages.city.min,
      "string.max": validationMessages.city.max,
    }),
    street: Joi.string().min(3).max(100).messages({
      "string.min": validationMessages.street.min,
      "string.max": validationMessages.street.max,
    }),
    zipcode: Joi.string().max(10).messages({
      "string.max": validationMessages.zipcode.max,
    }),
  };

  requiredFields.forEach((field) => {
    schema[field] = schema[field].required();
  });

  return Joi.object(schema);
};

const customerCompanySchema = createSchema([
  "customerName",
  "country",
  "idNumber",
]);
const updateCustomerCompanySchema = createSchema();

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateCustomerCompany: validate(customerCompanySchema),
  validateUpdateCustomerCompany: validate(updateCustomerCompanySchema),
};
