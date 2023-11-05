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
    const { code, totalRight, totalWrong, totalQuestions} = req.body;
    const user=req.user;
    console.log("user is " ,user)
    console.log("code is " ,code)
    const scores = await ExamScore.findOne({ email: user.email, code: code });

    if (scores) {
      // If a score with the provided email and code exists, return a response with a status code
      return res.status(409).json({ message: "Exam already given" });
    } 

else{
    const Score = new ExamScore();
    Score.code=code
    Score.email=user.email
    Score.correctAnswers = totalRight;
    Score.wrongAnswers = totalWrong;
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
    
    
  }

  ,
  showScore: async (req,res)=>{
    const user=req.user;
    console.log("yaha wali id is",user)

  try {
    const email=user.email;
    const code=user.code;
    const scores = await ExamScore.findOne({ email:email,code:code}) // Find all exam scores for a specific user

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