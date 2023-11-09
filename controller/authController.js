const User = require("../models/userModels");
const bcrypt = require("bcryptjs");

//User Registration
const userRegistration = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const isExcisting = await User.findOne({ email });
    if (isExcisting) return res.status(400).send("Email already registered");

    if (!name || !email || !password || !confirmpassword)
      return res.status(400).send("Fill all Feilds");

    if (password !== confirmpassword)
      return res.status(400).send("Password and Confirm password dosent match");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).send("Account created");
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};

// login user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send("Fill all feilds");

    const data = await User.findOne({ email });
    if (!data) return res.status(400).send("wrong credentials");

    const matching = await bcrypt.compare(password, data.password);
    if (!matching) return res.status(400).send("wrong credentials");

    res.status(200).send("login success");
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};
module.exports = {
  userRegistration,
  userLogin,
};
