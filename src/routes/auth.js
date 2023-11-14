const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const requireAuth = require("../middlewares/verifytoken");
const Question = require("../models/question"); 
const authController = require("../controllers/auth");
const paperController = require("../controllers/paper");
const userHasTakenExam=require("../middlewares/hasTakenExam")
const cookieParser = require('cookie-parser');
const question = require("../models/question");
const verifyStudent = require("../middlewares/verifyStudent");
const ExamScore = require("../models/examScore");
const nodemailer = require('nodemailer');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());


router.post('/signup', authController.signup);


router.post('/login', authController.login);


router.get('/admin-dashboard',requireAuth,  authController.adminDashboard);

router.get("/questions",requireAuth, userHasTakenExam ,paperController.setQuestion)
router.post("/result",verifyStudent, paperController.saveScore)
router.get("/result",verifyStudent,paperController.showScore)
router.post("/studentLogin",authController.studentLogin)


router.delete('/deletePaper',requireAuth, async (req, res) => {
  console.log("ddddddddddddddddddddddddddddddddddddddddddd",req.user.userId);
const userData=req.user.userId;
  try {
    await Question.deleteOne({ myData: userData })
    console.log("i an here")
    res.status(204).send();
  } catch (error) {
    console.log("i an here too")

    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Error deleting question' });
  }
});

router.post("/addquestion", requireAuth, async (req, res) => {
  try {
    const { userData } = req.body.myData;
    const questionData = req.body.question;
    console.log("afsa...........fadfa.............fsafa",userData)

    const existingQuestion = await Question.findOne({ myData: userData });


    console.log("afsa...........fadfa......fsadfffffffffffffffffffffffffffffff.......fsafa",userData)

    if (existingQuestion) {
      console.log("yeah saved")
      existingQuestion.question.push({
        text: questionData.text,
        options: questionData.options,
        correctAnswer: questionData.correctAnswer,
      });

    
      await existingQuestion.save();

      res.json(existingQuestion);
    } else {
   
      console.log("yaha aagte")
      const newQuestion = new Question({
        myData: userData,
        question: [
          {
            text: questionData.text,
            options: questionData.options,
            correctAnswer: questionData.correctAnswer,
          },
        ],
      });
      console.log("yaha bhi aa gye",newQuestion)

      await newQuestion.save();

      res.json(newQuestion);
    }
  } catch (error) {

    console.log("yaha kyu aa rhe bhai",error)
    res.status(500).json({ error: "Error creating the question." });
  }
});




router.get("/showquestionlist",requireAuth, async (req, res) => {
 
  console.log(req.user.userId)



  try {
    const questions = await Question.find({myData:req.user.userId});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions." });
  }
});


router.get("/showquestion",verifyStudent,userHasTakenExam, async (req, res) => {
 
  console.log(req.user.code)



  try {
    const questions = await Question.find({code:req.user.code});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions." });
  }
});




router.delete("/deletequestion/:id", requireAuth, async (req, res) => {
  const questionId = req.params.id;
  const myData=req.user.userId;

  try {

    const result = await Question.updateOne(
      { myData: myData }, 
      { $pull: { question: { _id: questionId } } }
    );

    if (result.n === 0) {
      return res.status(404).json({ error: "Question not found." });
    }

    res.json({ message: "Question deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the question." });
  }
});



router.delete("/createnewpaper", requireAuth, async (req, res) => {
  const myData=req.user.userId;
try{
  const result=await Question.deleteOne({myData: myData});

  if(result.n==0){
    return res.status(404).json({ error: "Paper not found." });
  }
  res.json({ message: "old Paper delted successfully." });

}
catch(err) {
  res.status(500).json({ error: "Error deleting the old paper." });
}
})



router.get("/studentsResults/:code",requireAuth,async (req,res )=>{
  try {
    const code = req.params.code;
    const results = await ExamScore.find({ code: code });

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ error: "No results found for the provided paper code" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
})


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shivamdubeyfd@gmail.com', 
    pass: 'aily tdpo aaji rhgn'   
  }
});


router.post('/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    
    const mailOptions = {
      from: email, 
      to: 'shivamdubeyfd@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

  
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
