const express = require("express");
const router = express.Router();
const { verifyToken, verifyApiKey } = require("../auth/auth");
const {
  textContent,
  updateService,
  createService,
} = require("../database/serviceSetup");

// Route Name invoiceStatus
router
  .get("/", verifyApiKey, textContent)
  .put("/:id", updateService)
  .post("/", createService);

module.exports = router;
