const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

//Create a question
router.post("/", createQuestion);

//Get all questions
router.get("/", getAllQuestions);

//Get question by id
router.get("/id/:id", getQuestionById);

//Update a question
router.patch("/:id", updateQuestion);

//Delete a question
router.delete("/:id", deleteQuestion);

module.exports = router;
