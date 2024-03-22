const Question = require("../models/questionModel");

//Create Questions
const createQuestion = async (req, res) => {
  try {
    const { questionText, answer } = req.body;

    //check questionText, answer, is empty
    if (!questionText || !answer) {
      return res.status(400).json({
        message: "questionText and answer must be filled",
      });
    }

    //check if Question already exists
    const existingQuestion = await Question.findOne({ questionText });
    if (existingQuestion) {
      return res.status(409).json({ message: "Question already exists" });
    }

    //create new Question
    const newQuestion = new Question({
      questionText,
      answer,
    });
    await newQuestion.save();

    res.status(200).json({
      questionText,
      answer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Questions
const getAllQuestions = async (req, res) => {
  try {
    const Questions = await Question.find();
    if (!Questions) {
      return res.status(404).json({ message: "Questions not found" });
    } else {
      res.status(200).json(Questions);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get Question by ID
const getQuestionById = async (req, res) => {
  try {
    const Question = await Question.findById(req.params.id);
    if (!Question) {
      return res.status(404).json({ message: "Question not found" });
    } else {
      res.status(200).json(Question);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get Question by type
// const getQuestionByType = async (req, res) => {
//   try {
//     const Question = await Question.findById(req.params.id);
//     if (!Question) {
//       return res.status(404).json({ message: "Question not found" });
//     } else {
//       res.status(200).json(Question);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

//Update a Question
const updateQuestion = async (req, res) => {
  try {
    const { questionText, answer } = req.body;

    //find Question by ID
    const Question = await Question.findById(req.params.id);
    if (!Question) {
      return res.status(404).json({ message: "Question not found" });
    }

    //update Question
    Question.questionText = questionText || Question.questionText;
    Question.answer = answer || Question.answer;

    await Question.save();

    //send success message
    res.json({ message: "Question updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a Question
const deleteQuestion = async (req, res) => {
  try {
    const Question = await Question.findById(req.params.id);
    if (!Question) {
      return res.status(404).json({ message: "Question not found" });
    } else {
      await Question.deleteOne();
      res.status(200).json({ message: "Question deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
