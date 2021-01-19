const { signup, login, logout } = require("../controllers/auth.controller");
const validate = require("../../middlewares/validateAuth");

const router = require("express").Router();

router.route("/signup").post(validate, signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
