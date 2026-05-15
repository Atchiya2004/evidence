const router = require("express").Router()
const controller = require("../controllers/adminController")
const auth = require("../middleware/authMiddleware")

router.post("/create-user",auth(["admin"]),controller.createUser)

module.exports = router