const Joi = require("joi");

const updateUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).messages({
    "string.min": "Must have at least 3 characters",
    "string.max": "Must have max 30 characters",
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

const createEmployerSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required().messages({
    "string.min": "First Name Must have at least 3 characters",
    "string.max": "First Name Must have max 30 characters",
    "string.required": "First Name is required",
  }),
  lastName: Joi.string().min(3).max(30).required().messages({
    "string.min": "Last Name Must have at least 3 characters",
    "string.max": "Last Name Must have max 30 characters",
    "string.required": "Last Name is required",
  }),
  email: Joi.string().email().required(),
  departmentId: Joi.number().positive().min(1).max(100).required(),
  password: Joi.string()
    .required()
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

const validateUserCreate = (req, res, next) => {
  const { firstName, lastName, email, password, departmentId } = req.body;

  const { error } = createEmployerSchema.validate(
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
  validateUserCreate,
};
