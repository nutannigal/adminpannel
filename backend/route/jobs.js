const router = require('express').Router();
const Job = require('../model/Job')
const auth = require('../middleware/auth');
const { findByIdAndDelete } = require('../model/User');



router.get('/', async (req, res) => {
  const job = await Job.find()
  res.json(jobs);
});

// create Job
router.post('/', auth, async (req, res) => {
  const newJob = await Job.create(req.body);
  res.json(newJob);
})


router.put("/:id", auth, async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);

});


router.delete('/:id',auth,async(req,res)=>{
  await Job.findByIdAndDelete(req.params.id)
  
    res.json({msg:'Deleted'})

});
module.exports=router;

