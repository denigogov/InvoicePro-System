const Joi = require("joi");

const createInvoiceSchema = Joi.object({
  date: Joi.date(),
  companyInfoId: Joi.number().positive().required(),
  customercompanyId: Joi.number().positive().required(),
  createdById: Joi.number().positive().required(),
  totalPrice: Joi.number().positive().required(),
});

const validateInvoiceCreate = (req, res, next) => {
  const { date, companyInfoId, customercompanyId, createdById, totalPrice } =
    req.body;

  const { error } = createInvoiceSchema.validate(
    {
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

const updateInvoiceSchema = Joi.object({
  invoiceId: Joi.string().min(2).max(50),
  date: Joi.date(),
  companyInfoId: Joi.number().positive(),
  customercompanyId: Joi.number().positive(),
  statusId: Joi.number().positive(),
  totalPrice: Joi.number().positive(),
});

const validateUpdateInvoice = (req, res, next) => {
  const {
    invoiceId,
    date,
    companyInfoId,
    customercompanyId,
    totalPrice,
    statusId,
  } = req.body;

  const { error } = updateInvoiceSchema.validate(
    {
      invoiceId,
      date,
      companyInfoId,
      customercompanyId,
      totalPrice,
      statusId,
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
  validateInvoiceCreate,
  validateCreateInvoiceDetails,
  validateUpdateInvoice,
};
