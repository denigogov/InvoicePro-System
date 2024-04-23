const Joi = require("joi");

const createInvoiceSchema = Joi.object({
  invoiceId: Joi.string().max(50),
  date: Joi.date(),
  companyInfoId: Joi.number().positive().required(),
  customercompanyId: Joi.number().positive().required(),
  createdById: Joi.number().positive().required(),
  totalPrice: Joi.number().positive().required(),
});

const validateInvoiceCreate = (req, res, next) => {
  const {
    invoiceId,
    date,
    companyInfoId,
    customercompanyId,
    createdById,
    totalPrice,
  } = req.body;

  const { error } = createInvoiceSchema.validate(
    {
      invoiceId,
      date,
      companyInfoId,
      customercompanyId,
      createdById,
      totalPrice,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const createInvoiceDetail = Joi.object({
  invoiceID: Joi.number().positive().required(),
  description: Joi.string().min(3).max(200).required(),
  price: Joi.number().positive().required(),
});

// VALIDATING ARRAY !
const createInvoiceDetails = Joi.array().items(createInvoiceDetail);

const validateCreateInvoiceDetails = (req, res, next) => {
  const invoiceDetails = req.body;

  const { error } = createInvoiceDetails.validate(invoiceDetails, {
    abortEarly: false,
  });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateInvoiceCreate,
  validateCreateInvoiceDetails,
};
