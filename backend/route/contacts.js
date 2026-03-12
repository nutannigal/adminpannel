const router = require('express').Router();
const Contact = require('../model/Contact')
const auth = require('../middleware/auth');


// submit contact
router.post('/', async (req, res) => {
   await Contact.create(req.body);
  res.json({msg:'msg sent'});
});


// get all

router.get('/',  auth, async (req, res) => {
  try{
  const contacts =await Contact.find().sort({
    createdAt: -1});


res.json(contacts);
  } catch(err)
  {res.status(500).send('server error');
  }
  });

module.exports=router;

