const express = require("express");
const router = express.Router();

const {
  createLesson,
  getAllLessons,
  getLessonsByCreatorId,
  getLessonById,
  getLessonsByXpLevel,
  getLessonsByLanguage,
  getLessonsWithVideos,
  getLessonsWithArticles,
  getLessonsWithQuizzes,
  getLessonsWithKeywords,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

const { authenticateUserMiddleware } = require("../middleware/auth");

//Create a lesson
router.post("/", createLesson);

//Get all lessons
router.get("/", getAllLessons);

//Get all lessons by ID
router.get("/creator/:creatorId", getLessonsByCreatorId);

//Get lesson by id
router.get("/id/:id", getLessonById);

//Get lessons by xpLevel
router.get("/xpLevel/:xpLevel", getLessonsByXpLevel);

//Get lessons by language
router.get("/language/:language", getLessonsByLanguage);

//Get lessons with videos
router.get("/videos", getLessonsWithVideos);

//Get lessons with articles
router.get("/articles", getLessonsWithArticles);

//Get lessons with quizzes
router.get("/quizzes", getLessonsWithQuizzes);

//Get lessons with keywords
router.get("/keywords", getLessonsWithKeywords);

//Update a lesson
router.patch("/:id", updateLesson);

//Delete a lesson
router.delete("/:id", deleteLesson);

module.exports = router;
