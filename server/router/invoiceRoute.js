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

const {
  invoiceTotalProMonth,
  recentInvoices,
} = require("../database/chartData");

// Route name invoice
router
  .get("/totalMonthly", verifyToken, invoiceTotalProMonth)
  .get("/recent", verifyToken, recentInvoices)
  .post("/pagination", verifyToken, allInvoicesPagination)
  .get("/lastId", verifyToken, lastInvoiceId)
  .get("/:id", verifyToken, selectInvoiceById)
  .post("/", verifyToken, validateInvoiceCreate, createInvoice)
  .post(
    "/details",
    verifyToken,
    validateCreateInvoiceDetails,
    createInvoiceDetails
  )
  .put("/:id", verifyToken, validateUpdateInvoice, updateInvoice)
  .put(
    "/details/:id",
    verifyToken,
    validateUpdateInvoiceDetails,
    updateInvoiceDetails
  )
  .delete("/:id", verifyToken, deleteInvoice);

module.exports = router;
