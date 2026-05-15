const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  crimeType: String,
  location: String,
  caseDate: Date,

  assignedOfficer: String,
  assignedLawyer: String,

  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open"
  },

  createdBy: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Case", caseSchema);