const express = require("express");
const router = express.Router();

const { verifyToken } = require("../auth/auth");
const {
  validateCustomerCompany,
  validateUpdateCustomerCompany,
} = require("../validation/customerCompanyValidation");

const {
  allCustomers,
  createCustomerCompany,
  updateCustomerCompany,
} = require("../database/customerCompany");

// Route name customer
router
  .get("/:id?", allCustomers)
  .post("/", validateCustomerCompany, createCustomerCompany)
  .put("/:id", validateUpdateCustomerCompany, updateCustomerCompany);

module.exports = router;
