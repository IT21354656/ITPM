const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSnippetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,

  }, 
  code: {
    type: String,
    required: true

  },
  tags: {
    type: [String],
    required: false,
  },
});

// export user model
module.exports = mongoose.model("CodeSnippets", codeSnippetSchema);
