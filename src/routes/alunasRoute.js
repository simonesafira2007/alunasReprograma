const express = require("express")
const router = express.Router()
const controller = require("../controllers/alunasController")

router.get("/", controller.getAllStudents)
router.post("/", controller.createStudent)
router.delete("/:id", controller.deleteStudent)
router.put("/:id", controller.updateStudent)
router.patch("/:id/atividadeRemunerada", controller.updateatividadeRemuneradaStatus)
router.get("/:id", controller.getStudent)
  


module.exports = router;
