const mongoose = require('mongoose');

const examScoreSchema = new mongoose.Schema({
  code: { type: String, required: true }, 
  email: { type: String, required: true }, 
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
});

const ExamScore = mongoose.model('ExamScore', examScoreSchema);


module.exports = ExamScore;
