const Joi = require("joi");

// Schema for signup
const signupSchema = Joi.object({
  userType: Joi.string().valid("1", "2").required().label("User Type"),
  firstName: Joi.string().min(1).required().label("First Name"),
  lastName: Joi.string().min(1).required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "Passwords do not match" }),
});

// Schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

module.exports = {
  signupSchema,
  loginSchema,
};
