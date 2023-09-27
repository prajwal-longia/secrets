//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { ObjectId } = require("mongoose");

const homeStartingContent = "Welcome to Stealthy Stories!! Where Every Day Holds a Story. It is your canvas for daily musings, a sanctuary for your thoughts, and a chronicle of your personal growth. To add stories add '/compose' in the address bar or click on the compose tab .";
const aboutContent = "This website was made for my final year project in college. It is nothing fancy but is something I enjoyed creating. It is made using Node.js as the backend and Database used is MongoDB .";
const contactContent = "Get in Touch with me. I'm delighted to hear from you! Whether you have a question, a suggestion, or just want to share your thoughts, I'm here to listen. For general questions or feedback about my webpage, please feel free to reach out to me at : email : info@mydiary.com phone: 923-547-xxxx . :)";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://prajwallongia8:ZElwSMPSaJLakGpz@cluster0.ilpfjha.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});




app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
