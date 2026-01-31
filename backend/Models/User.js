// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     email:{
//         type : String,
//         require : true,
//         unique : true
//     },
//     password:{
//         type : String,
//         require : true,
//     },

//     marks:{
//         type:Number,
//         require:false,
//         default:0
//     }
// });



// module.exports = mongoose.model("user",userSchema);



const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 

  scores: [scoreSchema],
});

module.exports = mongoose.model("user", userSchema);
