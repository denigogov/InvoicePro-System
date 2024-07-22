const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");

const { selectAllDepartments } = require("../database/departments");

// route name = department
router.get("/", verifyToken, selectAllDepartments);

module.exports = router;
