const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "API de alunas do curso Reprograma - On7 - Porto Digital Back-end 2020.2 ",
        version: "1.0.0"
    })
})
    
module.exports = router