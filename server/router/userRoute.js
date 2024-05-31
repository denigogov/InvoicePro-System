const express = require("express");
const router = express.Router();
const { verifyToken, hashedPassword } = require("../auth/auth");

const { validateUserUpdate } = require("../validation/userValidation");
const { selectAllUsers, updateUser } = require("../database/users");

// Route name = User

router
  .get("/", selectAllUsers)
  .put("/:id", validateUserUpdate, hashedPassword, updateUser);

module.exports = router;
