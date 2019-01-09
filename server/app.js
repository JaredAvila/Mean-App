const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const Post = require("./models/post");

mongoose
  .connect(
    "mongodb://localhost/postApp_angular",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to db! AW YEA!");
  })
  .catch(() => {
    console.log("connection to db failed.. wa wa wa waaaaaaaaaaaaaaa");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "success",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(data => {
      res.status(200).json({
        message: "success",
        posts: data
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post Deleted" });
  });
});

module.exports = app;
