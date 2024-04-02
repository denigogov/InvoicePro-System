const rateLimit = require("express-rate-limit");
/**
 * limit the api request for 10 requests for  24 hours for more securityf
 */
const resendCodeLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, //24h
  max: 10, // max request 10
  message: "You have exceeded the resend confirmation code request limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  resendCodeLimit,
};
