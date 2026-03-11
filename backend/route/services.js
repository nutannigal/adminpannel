const router = require('express').Router();
const Service = require('../model/Service')
const auth = require('../middleware/auth');
const { findByIdAndDelete } = require('../model/User');



router.get('./', async (req, res) => {
  const services = await Service.find()
  res.json(services);
});

// create service
router.post('/', auth, async (req, res) => {
  const newService = await Service.create(req.body);
  res.json(newService)
})


router.put("/:id", auth, async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);

});


router.delete('/:id',auth,async(req,res)=>{
  await Service.findByIdAndDelete(req.params.id)
  
    res.json({msg:'Deleted'})

});
module.exports=router;

