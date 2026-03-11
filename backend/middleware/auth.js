const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const tokan = req.header('x-auth-tokan')


  if (!tokan) return
  res.status(401).json({ msg: 'no tokan' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET).userId;
    next();

  }
  catch {
    res.status(401).json({ msg: 'Invalid token' })
  }
};