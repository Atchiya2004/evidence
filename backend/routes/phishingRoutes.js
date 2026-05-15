const router = require("express").Router()
const controller = require("../controllers/phishingController")

router.post("/",controller.analyze)

module.exports = router