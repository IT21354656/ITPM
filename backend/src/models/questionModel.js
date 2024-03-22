const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  answer: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

// export user model
module.exports = mongoose.model("questions", questionSchema);
