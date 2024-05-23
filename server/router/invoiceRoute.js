const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");

const {
  createInvoice,
  lastInvoiceId,
  createInvoiceDetails,
  allInvoicesPagination,
  deleteInvoice,
  updateInvoice,
  selectInvoiceById,
  updateInvoiceDetails,
} = require("../database/invoiceDB");
const {
  validateInvoiceCreate,
  validateCreateInvoiceDetails,
  validateUpdateInvoice,
  validateUpdateInvoiceDetails,
} = require("../validation/invoiceValidation");

const { invoiceTotalProMonth } = require("../database/chartData");

// Route name invoice
router
  .get("/totalMonthly", invoiceTotalProMonth)
  .post("/pagination", allInvoicesPagination)
  .get("/lastId", lastInvoiceId)
  .get("/:id", selectInvoiceById)
  .post("/", validateInvoiceCreate, createInvoice)
  .post("/details", validateCreateInvoiceDetails, createInvoiceDetails)
  .put("/:id", validateUpdateInvoice, updateInvoice)
  .put("/details/:id", validateUpdateInvoiceDetails, updateInvoiceDetails)
  .delete("/:id", deleteInvoice);

module.exports = router;
