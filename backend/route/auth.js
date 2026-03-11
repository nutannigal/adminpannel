const express = require('express')
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try{
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

  if (!user) 
    return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRETE, {
    expireIn: '1d'
  });
  res.json({token});
}catch(err)
{
  res.status(500).send('server err');
}
});
module.exports = router;