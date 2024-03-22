const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workspace: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    required: true,
  },
});

// export code model
module.exports = mongoose.model("codes", codeSchema);
