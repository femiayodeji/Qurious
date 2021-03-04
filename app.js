const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const body_parser = require('body-parser')
const app = express().use(body_parser.json())

const questionController = require("./controllers/QuestionController");

require("./config/db")

const cors = require('cors');
server =  require('http').createServer(app);
server.listen(process.env.PORT || 3000);

require("./config/db");

const port = server.address().port;

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app
  .route("/api/courses")
  .get(questionController.listAllCourses);

app
  .route("/api/questions")
  .get(questionController.listAllQuestions)
  .post(questionController.createNewQuestion);

  app
  .route("/api/questions/:course")
  .get(questionController.listAllCourseQuestions);

app
  .route("/api/questions/:questionid")
  .get(questionController.readQuestion)
  .put(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

console.log("connected and listening at http://localhost:%s", port); 