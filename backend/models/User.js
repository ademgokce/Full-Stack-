const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  phone:    { type: String },
  companyName: { type: String },
  address:     { type: String },
  taxId:       { type: String },
  paymentMethod: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
