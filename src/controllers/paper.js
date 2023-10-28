const Question=require("../models/question")
const multer=require("multer")
const ExamScore=require("../models/examScore")

const paperController={
    setQuestion: async(req, res)=>{

        try {
          const questions = await Question.find();
          res.json(questions);
        } catch (err) {
          res.status(500).json({ error: 'Error fetching questions' });
        }
    
      },

      // Server-side route to save exam scores
saveScore: async (req, res) => {
    const { correctAnswers, wrongAnswers, totalQuestions } = req.body;
    const user=req.user;
    console.log("user is " ,user)

    
    const Score = new ExamScore();
    Score.userId=user.userId
    Score.correctAnswers = correctAnswers;
    Score.wrongAnswers = wrongAnswers;
    Score.totalQuestions = totalQuestions,
   

    Score
      .save()

      .then(() => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  
    // Use your preferred database driver or ORM to save the scores
    
  
    
  }

  ,
  showScore: async (req,res)=>{
    const user=req.user;
    console.log("yaha wali id is",user.userId)

  try {
    const userId=user.userId;
    const scores = await ExamScore.findOne({ userId: userId }) // Find all exam scores for a specific user

    if (!scores || scores.length === 0) {
      return res.status(404).json({ error: 'Scores not found' });
    }

    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve scores' });
  }
  
  },


  
  
}

module.exports = paperController;