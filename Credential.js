const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  domain: String,
  encryptedData: String
});

module.exports = mongoose.model("Credential", credentialSchema);