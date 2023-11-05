const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

  code:{
    type:String,
    default: function () {
      return new Date().getTime().toString();
    }
   

  },

  myData: {
    type: String,
    
  },


  question: [
    {
      text: {
        type: String,
        
      },
      options: {
        type: [String], // options is an array of strings
      
      },
      correctAnswer: {
        type: String,
      
      },
      
    },
  ],
});

module.exports = mongoose.model('Question', questionSchema);
