const router = require("express").Router();
const AuthController = require("../controllers/authController");

router.route("/").post(AuthController.authenticate);

module.exports = router;
