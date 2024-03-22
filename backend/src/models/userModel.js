
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName:{
        type: String,
        
    },

    lastName: {
        type: String,

    },

    email: {
      type: String,
      required: true,
      
    },

    password: {
        type: String,
        required: true
    },

    codeScore:[{
        type: Number
    }]
    

    
  });


const UserModel = mongoose.model("users", userSchema);
  module.exports = {UserModel}