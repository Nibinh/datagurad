const express = require("express");
const router = express.Router();

const book = require("../controller/bookController");
const { verifyToken } = require("../services/middleware");

router.post("/create", verifyToken, book.createBook);
router.get("/getbook", book.getBook);
router.put("/editbook/:id", verifyToken, book.editBook);
router.delete("/delete/:id", verifyToken, book.deleteBook);

module.exports = router;
