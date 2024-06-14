const express = require("express");
const router = express.Router();
const { verifyToken, hashedPassword } = require("../auth/auth");

const {
  validateUserUpdate,
  validateUserCreate,
} = require("../validation/userValidation");
const { selectAllUsers, updateUser, createUser } = require("../database/users");

// Route name = User

router
  .get("/", selectAllUsers)
  .put("/:id", validateUserUpdate, hashedPassword, updateUser)
  .post("/", validateUserCreate, hashedPassword, createUser);

module.exports = router;
