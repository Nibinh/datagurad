const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

// admin registration
const adminRegistration = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const isExcisting = await Admin.findOne({ email });
    if (isExcisting) return res.status(400).send("Email already registered");

    if (!name || !email || !password || !confirmpassword)
      return res.status(400).send("Fill all Feilds");

    if (password !== confirmpassword)
      return res.status(400).send("Password and Confirm password dosent match");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await Admin.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).send(" Admin Account created");
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send("Fill all feilds");

    const data = await Admin.findOne({ email });
    if (!data) return res.status(400).send("wrong credentials");

    const matching = await bcrypt.compare(password, data.password);
    if (!matching) return res.status(400).send("wrong credentials");

    const token = JWT.sign({ email: data.email }, JWT_KEY, {
      expiresIn: "2hr",
    });

    if (!token) return res.status(400).send("token couldnt create");

    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send("Admin login success");
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};

module.exports = {
  adminRegistration,
  adminLogin,
};
