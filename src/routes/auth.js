const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const bodyParser = require('body-parser');
const requireAuth= require("../middlewares/verifytoken");
const paperController = require('../controllers/paper');
const userHasTakenExam=require("../middlewares/hasTakenExam")






// const { authorize } = require('../middlewares/authorize');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));





// singup route
router.post('/signup', authController.signup);

//loginTeacher
router.post('/login', authController.login);


router.get('/admin-dashboard',requireAuth,  authController.adminDashboard);

router.get("/questions",requireAuth,userHasTakenExam,paperController.setQuestion)
router.post("/result",requireAuth, paperController.saveScore)
router.get("/result",requireAuth,paperController.showScore)




// //route for getting data
// router.post('/users',verifyToken, authController.getData);

module.exports = router;
