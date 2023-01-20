const express = require("express");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://thetaaaj:9nNyy79GFMjKMasE@cluster0.qlx1xez.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo DB Successfully");
  })
  .catch(() => {
    console.log("Error occured while connecting");
  });

const app = express();
const bodyParser = require("body-parser");

const Post = require("./models/post");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE,PATCH,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Posts Added successfully",
      postId: result._id,
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne(
    { _id: req.params.id },
    { title: req.body.title, content: req.body.content }
  ).then((result) => {
    res.status(200).json({ message: "Post Updated successfully" });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: documents,
      });
    })
    .catch(() => {
      console.log("Error Occured !");
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(201).json({ message: "Post Deleted successfully" });
  });
});

module.exports = app;
