const Article = require('../models/Articles.js');
const Comment = require('../models/Comments.js');
const request = require("request");
const cheerio = require("cheerio");

module.exports = app => {

  //Scrapes NYTimes homepage for Top News articles, stores in Mongo if new article as determined by article id//
  app.get('/scrape', (req, res) => {
    let rank = 0
    request("http://www.nytimes.com/", (error, response, html) => {
      const $ = cheerio.load(html);
      const result = {};

      $("article").each(function(i, element) {

        let title = $(this).children(".story-heading").text().trim();
        let id = $(this).data("story-id");
        let section = $(this).attr("id");
        let link = $(this).children(".story-heading").children("a").attr("href");
        let image = $(this).find("figure").children(".image").children("a").children("img").attr("src");
        let summary = $(this).children(".summary").text().trim();
        let byline = $(this).children(".byline").text().trim();

        if (title !== "" && link !== undefined && id !== undefined && section !== undefined) {

          if (section.includes("topnews") === true) {
            rank += 1;

            result.title = title;
            result.link = link;
            result.image = image;
            result.summary = summary;
            result.byline = byline;
            result.rank = rank;
            result.storyId = id;

            let entry = new Article(result);

            entry.save((err, doc) => {
              if (err) {
                console.log(err);
              } else {
                console.log(doc);
              }
            });
          }
        }
      });
    });
    res.send("scrape complete");
  });

  //Gets stored article data from MongoDB and renders to DOM with index handlebars view//
  app.get('/', (req, res) => {
    Article.find({}).sort({createdAt: 1}).sort({rank: 1}).exec((err, data) => {
      if (err) {
        res.send(err);
      } else {
        let hbrsObj = {
          article: data
        }
        res.render('index', hbrsObj);
      }
    });
  });

  app.post("/article/:id", (req, res) => {
    let newComment = new Comment(req.body);

    newComment.save(function(err, doc) {
      if (err) {
        res.send(err);
      } else {
        Article.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: {
            "comments": doc._id
          }
        }, {
          new: true
        }, function(error, doc) {
          if (error) {
            res.send(error);
          } else {
            res.send(doc);
          }
        });
      }
    });
  });


app.get("/article/:id", function(req, res) {
  Article.find({_id: req.params.id})

    .populate("comment")

    .exec(function(error, doc) {

      if (error) {
        res.send(error);
      }
      else {
        console.log('got data')
        console.log(doc)
        res.json(doc);
      }
    });
});


};
