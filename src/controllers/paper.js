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

saveScore: async (req, res) => {
    const { code, totalRight, totalWrong, totalQuestions} = req.body;
    const user=req.user;
    console.log("user is " ,user)
    console.log("code is " ,code)
    const scores = await ExamScore.findOne({ email: user.email, code: code });

    if (scores) {
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
  
}
    
    
  }

  ,
  showScore: async (req,res)=>{
    const user=req.user;
    console.log("yaha wali id is",user)

  try {
    const email=user.email;
    const code=user.code;
    const scores = await ExamScore.findOne({ email:email,code:code}) 

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