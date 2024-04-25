const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");
const {
  createInvoice,
  lastInvoiceId,
  createInvoiceDetails,
  allInvoicesPagination,
} = require("../database/invoiceDB");
const {
  validateInvoiceCreate,
  validateCreateInvoiceDetails,
} = require("../validation/invoiceValidation");

router
  .get("/", allInvoicesPagination)
  .post("/", validateInvoiceCreate, createInvoice)
  .get("/lastId", lastInvoiceId)
  .post("/details", validateCreateInvoiceDetails, createInvoiceDetails);

module.exports = router;
