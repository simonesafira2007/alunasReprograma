const alunas = require("../models/alunas.json")
const fs = require("fs") 


const getAllStudents = (req, res) => {
    console.log(req.url)
    res.status(200).send(alunas)
}

// método POST - rota a ser chamada no Postman: (localhost:3000/alunas)
// adicionando uma nova aluna no array de alunas.json
const createStudent = (req, res) => {
    const { id, nome, estadoCivil, numeroDeFilhos, grauEscolaridade, cursoFormacaoAcademica, experienciaEmProgramacaoAntesReprograma, atividadeRemunerada, tempoForaMercadoTrabalho } = req.body
    alunas.push({ id, nome, estadoCivil, numeroDeFilhos, grauEscolaridade, cursoFormacaoAcademica, experienciaEmProgramacaoAntesReprograma, atividadeRemunerada, tempoForaMercadoTrabalho })
    fs.writeFile("./src/models/alunas.json", JSON.stringify(alunas), 'utf8', function (err) { // gravando nova aluna no array de alunas
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const alunaFound = alunas.find(aluna => aluna.id == id) // recupero a aluna que criei no array de alunas      
            res.status(200).send(alunaFound)
        }
    })
}
// Criando a rota de DELETE by id
// método DELETE - rota a ser chamada no Postman:(localhost:3000/alunas/id )
const deleteStudent = (req, res) => {
    try {
        const studentId = req.params.id
        const studentFound = alunas.find(aluna => aluna.id == studentId) // encontro a aluna pelo id
        const studentIndex = alunas.indexOf(studentFound) // identifico o índice da aluna no meu array

        if (studentIndex >= 0) { // verifico se a aluna existe no array de alunas
            alunas.splice(studentIndex, 1) // removo a aluna pelo índice
        } else {
            res.status(404).send({ message: "Aluna não encontrada para ser deletada" })
        }

        fs.writeFile("./src/models/alunas.json", JSON.stringify(alunas), 'utf8', function (err) { // gravo meu array de alunas sem a aluna que deletei
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Aluna deletada com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a aluna" })
    }
}


// Criando a rota PUT
// método PUT - rota a ser chamada no Postman: (localhost:3000/alunas/id)
const updateStudent = (req, res) => {
    try {
        const studentId = req.params.id
        const studentToUpdate = req.body //Pego o corpo da requisição com as alterações 

        const alunaFound = alunas.find(aluna => aluna.id == studentId) // separo a aluna a ser atualizada      
        const alunaIndex = alunas.indexOf(alunaFound) // separo o indice da aluna no array de alunas

        if (alunaIndex >= 0) { // verifico se a aluna existe no array de alunas
            alunas.splice(alunaIndex, 1, studentToUpdate) //busco no array a aluna, excluo o registro antigo e substituo pelo novo 
        } else {
            res.status(404).send({ message: "Aluna não encontrada para ser atualizado" })
        }
  
        fs.writeFile("./src/models/alunas.json", JSON.stringify(alunas), 'utf8', function (err) { // gravo meu json de alunas atualizado
            if (err) {
                res.status(500).send({ message: err }) // caso dê erro retorno status 500
            } else {
                console.log("Arquivo de alunas atualizado com sucesso!")
                const studentUpdated = alunas.find(aluna => aluna.id == studentId) // separo a aluna que modifiquei no array
                res.status(200).send(studentUpdated) // envio a aluna modificada como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) // caso dê erro retorno status 500
    }
}

// Criando a rota PATCH
// método PATCH - rota a ser chamada no Postman: (localhost:3000/alunas/id/atividadeRemunerada)
const updateatividadeRemuneradaStatus = (req, res) => {
    try {
        const studentId = req.params.id // pego a informação do id no parametro da requisição
        const atividadeRemunerada = req.body.atividadeRemunerada // pego a informação do atividadeRemunerada no corpo da requisição. Ele terá valor true ou false, dependendo do que tiver sido passado

        const studentToUpdate = alunas.find(aluna => aluna.id == studentId) // separo a aluna que irei mudar o status
        const studentIndex = alunas.indexOf(studentToUpdate) // identifico o índice da aluna no meu array

        if (studentIndex >= 0) { // verifico se a aluna existe no array de alunas
            studentToUpdate.atividadeRemunerada = atividadeRemunerada //atualizo o objeto com o novo status informando se atividade remunerada ou não
            alunas.splice(studentIndex, 1, studentToUpdate) // removo a aluna pelo índice substituindo pelo novo
        } else {
            res.status(404).send({ message: "Aluna não encontrada para informar se está realizando atividade remunerada ou não" })
        }

        fs.writeFile("./src/models/alunas.json", JSON.stringify(alunas), 'utf8', function (err) { // gravo meu json de alunas atualizado
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const studentUpdated = alunas.find((aluna) => aluna.id == studentId) // separo a aluna que modifiquei no array
                res.status(200).send(studentUpdated) // envio a aluna modificada como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}


// Criando a rota GET (by id)
// método GET - rota a ser chamada no Postman: (localhost:3000/alunas/id)
const getStudent = (req, res) => {
    const studentId = req.params.id
    const studentFound = alunas.find((aluna) => aluna.id == studentId)
    if (studentFound) {
        res.status(200).send(studentFound)
    } else {
        res.status(404).send({ message: "Aluna não encontrada" })
    }
}


module.exports = {
    createStudent,
    deleteStudent,
    updateStudent,
    updateatividadeRemuneradaStatus,
    getStudent,
    getAllStudents,
}
