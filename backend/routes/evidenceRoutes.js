const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");

const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/evidenceController");

// ✅ create uploads folder automatically
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// ✅ file size limit
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024
  }
});

router.post(
  "/upload",
  auth(["cid"]),
  upload.single("file"),
  controller.uploadEvidence
);

router.post(
  "/verify",
  auth(["cid"]),
  upload.single("file"),
  controller.verifyEvidence
);

router.get(
  "/all",
  auth(["admin", "cid", "lawyer"]),
  controller.getAllEvidence
);

router.get(
  "/case/:caseId",
  auth(["admin", "cid", "lawyer"]),
  controller.getEvidenceByCase
);

// ✅ lawyer added
router.get(
  "/timeline/:id",
  auth(["admin", "cid", "lawyer"]),
  controller.getTimeline
);

module.exports = router;