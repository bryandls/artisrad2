const express = require("express");
//const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sign-in Authorization Logic
/*
var users=[{
    name:"justin",
    password:"climbing"
},
{
    name:"mike",
    password:"legos",
},
{
    name:
}] */
var isValid=false;

app.get('/auth',(req,res)=>{
  res.json(isValid)
});

app.post('/submit',(req,res)=>{
  if(req.body.username === "justin" && req.body.password === "climbing"){
    isValid=true;
  }
  res.json(isValid)
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Define API routes here
const routes = require("./routes/api.js");
app.use(routes);

// Send every other request to the React app
//app.get("*", (req, res) => {
 // res.sendFile(path.join(__dirname, "./client/build/index.html"));
//});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/artdb");

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
