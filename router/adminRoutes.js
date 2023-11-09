const express = require("express");
const router = express.Router();

const admin = require("../controller/adminController");

router.post("/registration", admin.adminRegistration);
router.post("/login", admin.adminLogin);

module.exports = router;
