const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const { hashedPassword, verifyPassword, verifyToken } = require("../auth/auth");
const {
  findUserData,
  confirmCode,
  validateUser,
  sendUserInfo,
  resendCode,
} = require("../database/login");

const {
  validateUserLogin,
  validateConfirmCode,
} = require("../validation/loginValidation");

const { resendCodeLimit } = require("../auth/rateLimit");

router
  .post("/", findUserData, validateUserLogin, verifyPassword)
  .post("/confirm", verifyToken, validateConfirmCode, confirmCode)
  .get("/", verifyToken, validateUser, sendUserInfo)
  .post("/resendcode", resendCodeLimit, verifyToken, resendCode);

//   FOR creating new user !
// post("/", hashedPassword, (req, res) => {
//   const { email, passowrd } = req.body;

//   console.log("pass", passowrd);
//   console.log("emial", email);

//   if (email) {
//     res.status(200).send(passowrd);
//   }
// });

module.exports = router;
