const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE,PATCH,OPTIONS'
    );
  res.setHeader(
    'Access-Control-Allow-Headers', 
    "Origin,X-Requested-With,Content-Type,Accept"
    );
  next();
});


app.post('/api/posts',(req,res,next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message : 'Posts Added successfully'
  });
  
})

app.get('/api/posts',(req, res, next) => {
  const posts = [
    {
      id:'fwj123',
      title:'First server side Post',
      content:'This is the forst server side post recived from node backend !'
    },
    {
      id:'dfw123',
      title:'seconde server side Post',
      content:'This is the secpond server side post recived from node backend !'
    }
  ]
  return res.status(200).json({
    message : 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
