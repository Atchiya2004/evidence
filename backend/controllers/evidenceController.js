const Evidence = require("../models/Evidence");
const CustodyLog = require("../models/CustodyLog");
const Case = require("../models/Case");
const generateHash = require("../utils/hashGenerator");
const fs = require("fs");

const { storeEvidence, getEvidence } = require("../blockchain/blockchain");

exports.uploadEvidence = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Upload file" });

    const caseData = await Case.findById(req.body.caseId);
    if (!caseData) return res.status(404).json({ error: "Case not found" });

    const buffer = fs.readFileSync(req.file.path);
    const hash = generateHash(buffer);

    const evidenceId = req.file.filename;

    const { txHash, blockNumber } = await storeEvidence(
      evidenceId,
      hash,
      req.file.originalname
    );

    const evidence = await Evidence.create({
      caseId: req.body.caseId,
      fileName: evidenceId,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      hashValue: hash,
      txHash,
      blockNumber,
      uploadedBy: req.user.id
    });

    await CustodyLog.create({
      evidenceId: evidence._id,
      userId: req.user.id,
      action: "Uploaded"
    });

    res.json({ message: "Uploaded", txHash, blockNumber });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvidence = async (req, res) => {
  const list = await Evidence.find();
  res.json(list);
};

exports.getEvidenceByCase = async (req, res) => {
  try {
    const list = await Evidence.find({ caseId: req.params.caseId });

    const formatted = list.map(e => ({
      id: e._id,
      fileName: e.fileName,
      status: e.verificationStatus,   // ✅ FIX
      uploadedAt: new Date(e.uploadedAt).toLocaleString(),
      txHash: e.txHash
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch evidence" });
  }
};

exports.verifyEvidence = async (req, res) => {
  try {

    // ✅ file validation
    if (!req.file) {
      return res.status(400).json({
        error: "Upload verification file"
      });
    }

    // ✅ evidence validation
    const evidence = await Evidence.findById(req.body.evidenceId);

    if (!evidence) {
      return res.status(404).json({
        error: "Evidence not found"
      });
    }

    const buffer = fs.readFileSync(req.file.path);

    const newHash = generateHash(buffer);

    const blockchainData = await getEvidence(
      evidence.fileName
    );

    let status = "TAMPERED";

    if (
      newHash === evidence.hashValue &&
      newHash === blockchainData.hash
    ) {
      status = "VERIFIED";
    }

    evidence.verificationStatus = status;

    await evidence.save();

    await CustodyLog.create({
      evidenceId: evidence._id,
      userId: req.user.id,
      action: `Verified → ${status}`
    });

    res.json({ status });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Verification failed"
    });
  }
};

exports.getTimeline = async (req, res) => {
  const logs = await CustodyLog.find({
    evidenceId: req.params.id
  }).sort({ timestamp: 1 });

  res.json(logs);
};