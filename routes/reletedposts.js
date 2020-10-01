const router=require('express').Router();
const Posts = require("../models/Posts");

router.post('/reletedposts',async(req,res)=>{
    const {Topic,ch}=req.body;
    const data=await Posts.find({"Topic" : Topic},
{"reletedposts":{$elemMatch: {ch:ch}}})
res.send(data);
})

router.post('/addreletedpost',async(req,res)=>{
    const {relted,Topic,ch}=req.body;
    //console.log(username,message,Topic,ch)
      const com=await Posts.updateOne({"Topic":Topic,"reletedposts.ch":ch},
      {$push:{"reletedposts.$.reletedpost":relted}})
      res.send(com);
});
router.post('/deleteareletedpost',async(req,res)=>{
    const {topic,ch,reletedpost}=req.body;
   // console.log(req.body)
    const deletedreletedpost=await Posts.updateOne({"Topic":topic,"reletedposts.ch":ch},
    {$pull:{"reletedposts.$.reletedpost":reletedpost}})
    res.send(deletedreletedpost);
  })
module.exports = router;