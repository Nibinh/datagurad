const express = require("express");
const server = express();
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");

server.use(express.json());
server.use(cookieparser());
dotenv.config();
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`connected server to ${PORT}`);
});

const authRoutes = require("./router/authRoutes");
const adminRoutes = require("./router/adminRoutes");
const bookRoutes = require("./router/bookRoutes");

server.use("/auth", authRoutes);
server.use("/admin", adminRoutes);
server.use("/book", bookRoutes);
