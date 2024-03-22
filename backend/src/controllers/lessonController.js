const Lesson = require("../models/lessonModel");

//Create Lessons
const createLesson = async (req, res) => {
  try {
    const {
      title,
      description,
      xpLevel,
      language,
      category,
      lessonOrder,
      videoList,
      articleList,
      quizList,
      keywords,
      creatorId,
    } = req.body;

    //check title, description, xpLevel, language is empty
    if (!title || !description || !xpLevel || !language) {
      return res.status(400).json({
        message: "title, description, xpLevel, language fields must be filled",
      });
    }

    //check if lesson already exists
    const existingLesson = await Lesson.findOne({ title });
    if (existingLesson) {
      return res.status(409).json({ message: "Lesson already exists" });
    }

    //create new lesson
    const newLesson = new Lesson({
      title,
      description,
      xpLevel,
      category,
      language,
      lessonOrder,
      videoList,
      articleList,
      quizList,
      keywords,
      creatorId,
    });
    await newLesson.save();

    res.status(200).json({
      title,
      description,
      xpLevel,
      category,
      language,
      lessonOrder,
      videoList,
      articleList,
      quizList,
      keywords,
      creatorId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all lessons
const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    if (!lessons) {
      return res.status(404).json({ message: "Lessons not found" });
    } else {
      res.status(200).json(lessons);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get lessons by creatorId
const getLessonsByCreatorId = async (req, res) => {
  try {
    const lessons = await Lesson.find({ creatorId: req.params.creatorId });

    if (lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "Lessons not found for the specified creatorId" });
    } else {
      res.status(200).json(lessons);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// const getLessonsByCreatorId = async (req, res) => {
//   console.log("AAAAAAAAAAAAAAAAAAAAASSSSSSSSSSSSSSSSSSSSSSSS");
//   try {
//     const user = req.body;
//     const lessons = await Lesson.find({ creatorId: user });
//     console.log("AAAAAAAAAAAAAAAAAAAAASSSSSSSSSSSSSSSSSSSSSSSS", user);
//     if (lessons.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "Lessons not found for the specified creatorId" });
//     } else {
//       res.status(200).json(lessons);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

//Get lesson by ID
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    } else {
      res.status(200).json(lesson);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get lesson by XpLevel
const getLessonsByXpLevel = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ xpLevel: req.params.xpLevel });
    if (!lesson) {
      return res.status(404).json({ message: "Lessons not found" });
    } else {
      res.status(200).json(lesson);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get lesson by language
const getLessonsByLanguage = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ language: req.params.language });
    if (!lesson) {
      return res.status(404).json({ message: "Lessons not found" });
    } else {
      res.status(200).json(lesson);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get lessons with videos
const getLessonsWithVideos = async (req, res) => {
  try {
    const filter = {
      videoList: { $exists: true, $not: { $size: 0 } }, // Check if videoList exists and is not empty
    };

    const lessons = await Lesson.find(filter);

    if (lessons.length === 0) {
      return res.status(404).json({ message: "No lessons with videos found" });
    } else {
      res.status(200).json(lessons);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get lessons with articles
const getLessonsWithArticles = async (req, res) => {
  try {
    const filter = {
      articleList: { $exists: true, $not: { $size: 0 } }, // Check if articleList exists and is not empty
    };

    const lessons = await Lesson.find(filter);

    if (lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "No lessons with articles found" });
    } else {
      res.status(200).json(lessons);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get lessons with quizzes
const getLessonsWithQuizzes = async (req, res) => {
  try {
    const filter = {
      quizList: { $exists: true, $not: { $size: 0 } }, // Check if quizList exists and is not empty
    };

    const lessons = await Lesson.find(filter);

    if (lessons.length === 0) {
      return res.status(404).json({ message: "No lessons with quizzes found" });
    } else {
      res.status(200).json(lessons);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get lessons with keywords
const getLessonsWithKeywords = async (req, res) => {
  try {
    const filter = {
      keywords: { $exists: true, $not: { $size: 0 } }, // Check if keywords exists and is not empty
    };

    const lessons = await Lesson.find(filter);

    if (lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "No lessons with keywords found" });
    } else {
      res.status(200).json(lessons);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a lesson
const updateLesson = async (req, res) => {
  try {
    const {
      title,
      description,
      xpLevel,
      language,
      category,
      lessonOrder,
      videoList,
      articleList,
      quizList,
      keywords,
    } = req.body;

    //find lesson by ID
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    //update lesson
    lesson.title = title || lesson.title;
    lesson.description = description || lesson.description;
    lesson.xpLevel = xpLevel || lesson.xpLevel;
    lesson.language = language || lesson.language;
    lesson.category = category || lesson.category;
    lesson.lessonOrder = lessonOrder || lesson.lessonOrder;
    lesson.videoList = videoList || lesson.videoList;
    lesson.articleList = articleList || lesson.articleList;
    lesson.quizList = quizList || lesson.quizList;
    lesson.keywords = keywords || lesson.keywords;

    await lesson.save();

    //send success message
    res.json({ message: "Lesson updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a lesson
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    } else {
      await lesson.deleteOne();
      res.status(200).json({ message: "Lesson deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  getLessonsByCreatorId,
  getLessonsByXpLevel,
  getLessonsByLanguage,
  getLessonsWithVideos,
  getLessonsWithArticles,
  getLessonsWithQuizzes,
  getLessonsWithKeywords,
  updateLesson,
  deleteLesson,
};
