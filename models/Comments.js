const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: {
    type: String
  },
  body: {
    type: String
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
