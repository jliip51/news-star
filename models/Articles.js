const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  summary: {
    type: String,
  },
  byline: {
    type: String,
  },
  storyId: {
    type: String,
    required: true,
    unique: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
}, {
  timestamps: true
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
