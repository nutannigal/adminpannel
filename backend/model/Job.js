const mongoose =require('mongoose');
const JobSchema=new mongoose.Schema(
  {
    title:String,
    location:String,
    description:String
  }
);
module.exports=mongoose.model('Job',JobSchema);