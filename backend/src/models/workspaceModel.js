const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
});

// export user model
module.exports = mongoose.model("workspaces", workspaceSchema);
