const express = require("express");
const router = express.Router();
const { hashedPassword, verifyPassword, verifyToken } = require("../auth/auth");
const {
  findUserData,
  confirmCode,
  validateUser,
  sendUserInfo,
} = require("../database/login");

router
  .post("/", findUserData, verifyPassword)
  .post("/confirm", verifyToken, confirmCode)
  .get("/", verifyToken, validateUser, sendUserInfo);

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
