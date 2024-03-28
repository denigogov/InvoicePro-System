const Joi = require("joi");

const loginCredential = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
      )
    )
    .message(
      "Password should be at least 6 characters and should include at least 1 letter, 1 number, and 1 special character"
    )
    .required(),
});

const confirmCode = Joi.object({
  auth: Joi.string().length(8).required(),
});

const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginCredential.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateConfirmCode = (req, res, next) => {
  const { auth } = req.body;

  const { error } = confirmCode.validate({ auth }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUserLogin,
  validateConfirmCode,
};
