const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");





const authController = {



  //login callback funciton for signin page ( i have to change it little bit)
  login: async (req, res) => {
    const { username, password,email } = req.body;

    const user = new User();

    user.username = username;
    user.email=email;
    user.password = password;
    
    


    user
      .save()

      .then(() => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },



  //for getting all data from database
  getData: async (req, res) => {
    const docs = await User.find({});
    res.json(docs);
  },
};

module.exports = authController;
