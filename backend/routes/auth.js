const express = require("express");
const { userLogin, adminLogin } = require("../controllers/authController");
const router = express.Router();

router.post("/user-login", userLogin);
router.post("/admin-login", adminLogin);

module.exports = router;
