const express = require("express")
const router = express.Router()

//Controllers
const {authenticate} = require("../controllers/auth")


//Public route
//Autheticate
router.post("/", authenticate)

module.exports = router
