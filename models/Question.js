const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  options: {
    type: Array
  },
  Answer: {
    type: String,
    required: [true, 'Answer is required']
  },
  course: {
    type: Object,
    required: [true, 'Course is required']
  },

})

module.exports = mongoose.model("Questions", QuestionSchema);