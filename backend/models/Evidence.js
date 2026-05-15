const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema({
  caseId: String,

  fileName: String,
  filePath: String,
  fileType: String,

  hashValue: String,
  txHash: String,
  blockNumber: Number,

  verificationStatus: {
    type: String,
    enum: ["VERIFIED", "TAMPERED", "NOT VERIFIED"],
    default: "NOT VERIFIED"
  },

  uploadedBy: String,

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Evidence", evidenceSchema);