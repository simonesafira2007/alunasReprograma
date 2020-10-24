const express = require("express")
const app = express()

// rotas
const index = require("./routes/index")
const alunas = require("./routes/alunasRoute")
  

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // informo que minha api poderá ser chamada de qualquer lugar. Por um browser, por exemplo.
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
    // como criei uma função dentro do app.use, preciso dar um "next()" para mandar ele seguir para a próxima middleware. 
    // se eu não faço isso, a requisição vai ficar travada aí.
})

// (localhost:3000/) - exibe o título da nossa aplicação no navegador
// {"title":"API de alunas do curso Reprograma - On7 - Porto Digital Back-end 2020.2 ","version":"1.0.0"}
app.use("/", index)
app.use("/alunas", alunas) //(localhost:3000/alunas) - exibe todas as alunas do nosso arquivo alunas.json da nossa aplicação no navegador ou no postman

module.exports = app
