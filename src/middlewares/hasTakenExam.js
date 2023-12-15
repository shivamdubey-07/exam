const ExamScore = require("../models/examScore");

const userHasTakenExam = async (req, res, next) => {
  const email = req.user.email;
  
const code=req.user.code;

  console.log("the id is here broo",req.user)

  try {
    const examScore = await ExamScore.findOne({ email: email, code:code });

  console.log("the exam score is here broo",examScore)



    if (examScore) {
      return res.status(403).json({ error: "User has already taken the exam" });
    }

    next();
  } catch (error) {
    console.error("Error checking if user has taken the exam", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = userHasTakenExam;
