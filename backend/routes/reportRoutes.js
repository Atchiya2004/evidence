const router = require("express").Router();
const controller = require("../controllers/reportController");
const auth = require("../middleware/authMiddleware");

router.get("/case/:id", auth(["admin","cid", "lawyer"]), controller.generateReport);

module.exports = router;