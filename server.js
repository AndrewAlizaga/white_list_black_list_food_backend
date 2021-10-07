const express = require("express")
const app = express()
require("dotenv").config()

const port = process.env.PORT || 8000

app.use("/", (req, res) => {

	res.send("hello there")
})

app.listen(port, (req, res) => {
	console.log('alive at port: '+port)
})
