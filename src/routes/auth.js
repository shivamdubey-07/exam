const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const bodyParser = require('body-parser');


const cors=require("cors")

router.use(cors())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Login route
router.post('/login', authController.login);
//route for getting data
router.get('/users', authController.getData);

module.exports = router;
