const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/User')

require('dotenv').config();
mongoose.connect(process.env.MONGO_URL).then(async () => {
  const existing = await User.findOne({ email: 'admin@gmail.com' });
  if (existing) {
    console.log('Admin user redy exists');
    mongoose.disconnect();
    return;
  }
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = new User({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: hashedPassword,
    role: 'admin'
  });
  await user.save();
  console.log("admin user is created succ")
  mongoose.disconnect();
})
  .catch(err => {
    console.log('err:', err);
    mongoose.disconnect();
  });