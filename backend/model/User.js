const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      default: 'admin'
    }}
)

UserSchema.pre('save',async function(next){
  if(!this.isModified('password'))return next();

  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt)
});

// compere password 
 UserSchema.methods.comparePassword=async function(candidatePassword)
 {
  return await bcrypt.compare(candidatePassword,this.password);
 };
  module.exports=mongoose.model('User',UserSchema);