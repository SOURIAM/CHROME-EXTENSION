const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: String,
  email: String,
  encryptedPassword: String
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, default: function() {
    return this.email ? this.email.split('@')[0] : "User";
  }},
  passwordHash: String, 
  otp: String,
  otpExpiry: Date,
  accounts: [accountSchema] // store user's accounts
});

module.exports = mongoose.model("User", userSchema);