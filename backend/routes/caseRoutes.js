const router = require("express").Router()
const controller = require("../controllers/caseController")
const auth = require("../middleware/authMiddleware")

router.post("/create",auth(["admin"]),controller.createCase)
router.get("/all",auth(["admin","cid","lawyer"]),controller.getCases)
router.put("/close/:id",auth(["admin"]),controller.closeCase)

module.exports = router