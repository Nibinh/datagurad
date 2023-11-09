const express = require("express");
const router = express.Router();

const auth = require("../controller/authController");

router.post("/registration", auth.userRegistration);
router.post("/login", auth.userLogin);

module.exports = router;
