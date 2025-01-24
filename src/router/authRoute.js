const router = require("express").Router();
const { singup, login } = require("../controller/authController");
const validate = require("../middleware/validationMiddleware");
const { signupSchema, loginSchema } = require("../validators/authValidator");

// routes for auth
router.route("/signup").post(validate(signupSchema), singup);
router.route("/login").post(validate(loginSchema), login);

module.exports = router;
