const Question = require("../models/Question");

exports.listAllQuestions = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(questions);
  });
};


exports.listAllCourses = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    }
    var result = [];
    var courses = questions.map( d => d.course);
    courses.filter(function(item){
        var i = result.findIndex(x => x.code == item.code);
        if(i <= -1){
          result.push({code: item.code, title: item.title});
        }
        return null;
      });
    res.status(200).json(result);
  });
};

exports.listAllCourseQuestions = (req, res) => {
  Question.find({'course.code' : req.params.course}, (err, questions) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).json(questions);
  });
};

exports.createNewQuestion = (req, res) => {
  let newQuestion = new Question(req.body);
  newQuestion.save((err, question) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(question);
  });
};

exports.readQuestion = (req, body) => {
  Question.findById(req.params.questionid, (err, question) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(question);
  });
};

exports.updateQuestion = (req, res) => {
  Question.findOneAndUpdate(
    { _id: req.params.questionid },
    req.body,
    { new: true },
    (err, question) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(question);
    }
  );
};

exports.deleteQuestion = (req, res) => {
  Question.remove({ _id: req.params.questionid }, (err, question) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Question successfully deleted" });
  });
};
