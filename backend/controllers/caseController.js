const Case = require("../models/Case");

exports.createCase = async (req, res) => {
  const newCase = new Case({
    ...req.body,
    createdBy: req.user.id
  });

  await newCase.save();
  res.json(newCase);
};

exports.getCases = async (req, res) => {
  const cases = await Case.find();
  res.json(cases);
};

exports.closeCase = async (req, res) => {
  const caseData = await Case.findById(req.params.id);

  if (!caseData) {
    return res.status(404).json("Case not found");
  }

  caseData.status = "Closed";
  await caseData.save();

  res.json("Case Closed");
};