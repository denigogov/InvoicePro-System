const Joi = require("joi");

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).messages({
    "string.min": "Must have at least 1 characters",
    "string.max": "Must have max 30 characters",
    "string.required": "This is required",
  }),
  lastName: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  departmentId: Joi.number().positive().min(1).max(100),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
      )
    )
    .message(
      "Password should be at least 6 characters and should include at least 1 letter, 1 number, and 1 special character"
    ),
});

const validateUserUpdate = (req, res, next) => {
  const { firstName, lastName, email, password, departmentId } = req.body;

  const { error } = updateUserSchema.validate(
    {
      firstName,
      lastName,
      email,
      password,
      departmentId,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUserUpdate,
};
