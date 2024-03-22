const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  xpLevel: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  lessonOrder: {
    type: Number,
    required: false,
  },
  videoList: {
    type: [String],
    required: false,
  },
  articleList: {
    type: [String],
    required: false,
  },
  quizList: {
    type: [String],
    required: false,
  },
  keywords: {
    type: [String],
    required: false,
  },
  creatorId: {
    type: String,
    required: false,
  },
});

// export user model
module.exports = mongoose.model("lessons", lessonSchema);
