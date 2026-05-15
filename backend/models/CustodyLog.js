const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  evidenceId: String,
  userId: String,
  action: String,

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CustodyLog", logSchema);