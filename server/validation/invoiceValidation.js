const Joi = require("joi");

const createInvoiceSchema = Joi.object({
  invoiceId: Joi.string().max(50),
  date: Joi.date(),
  companyInfoId: Joi.number().positive().required(),
  customercompanyId: Joi.number().positive().required(),
  createdById: Joi.number().positive().required(),
  description: Joi.string().min(5).max(200).required(),
  price: Joi.number().positive().required(),
  totalPrice: Joi.number().positive().required(),
});

const validateInvoiceCreate = (req, res, next) => {
  const {
    invoiceId,
    date,
    companyInfoId,
    customercompanyId,
    createdById,
    description,
    price,
    totalPrice,
  } = req.body;

  const { error } = createInvoiceSchema.validate(
    {
      invoiceId,
      date,
      companyInfoId,
      customercompanyId,
      createdById,
      description,
      price,
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

module.exports = {
  validateInvoiceCreate,
};
