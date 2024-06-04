const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Question=require("../models/question")
const Student=require("../models/student")


const authController = {


  studentLogin: async (req,res)=>{
   

    const {name,email,code}=req.body;
   const student=new Student();

   student.name=name;
   student.email=email;
   student.code=code;
   

   const existingUser = await Student.findOne({ code: code, email: email }).exec();
   if (existingUser) {
     return res.status(400).json({ message: "Email already registered" });
   }
    
   try {
    const check = await Question.findOne({ code: code });
  
    if (check) {
      const token = jwt.sign({ email: email, code:code}, process.env.JWTSECRETKEY, {
        expiresIn: "3h",
      });

      res.cookie('studentToken', token, {
      
 
        maxAge:  3000*60*60, 
        httpOnly: true, 
        secure: false,
          domain: 'localhost',
          path: '/',

        
      });
      console.log("student token",token)
      student.save()
      res.status(200).json({ message: 'Document found.' });
    } else {
      
      res.status(404).json({ message: 'Document not found.' });
    }
  } catch (error) {
    console.error('Error checking for document:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
},

  



 



  signup: async (req, res) => {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();

    user.username = username;
    user.email = email;
    (user.password = hashedPassword),
    (user.role = "user"),
    (user.permissions = ["read"]);

    user
      .save()

      .then(() => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).exec();

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      if (user) {
      

        const token = jwt.sign({ userId: user._id }, process.env.JWTSECRETKEY, {
          expiresIn: "3h",
        });

        res.cookie('jwt', token, {
        
   
          maxAge:  3000*60*60, 
        
          secure: false,
            domain: 'vercel.app',
            path: '/',

          
        });
       
        console.log(token)
        res.json({ success: true, token: token });
      } else {

        res.status(401).json({ message: "Authentication failed" });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  adminDashboard: async (req, res) => {


    res.send(  req.user)
  },


  


  getData: async (req, res) => {
    const docs = await User.find({});
    res.json(docs);
  },
};

module.exports = authController;
