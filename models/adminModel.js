const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose.connect(url);

const AdminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
//  soldProducts: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
