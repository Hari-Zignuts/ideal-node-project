const router = require("express").Router();
const { singup, login } = require("../controller/authController");
const {
  validateSignupInputMiddleware,
  validateLoginInputMiddleware,
} = require("../middleware/validation");

// routes for auth
router.route("/signup").post(validateSignupInputMiddleware, singup);
router.route("/login").post(validateLoginInputMiddleware, login);

module.exports = router;
