const router=require('express').Router();
const Posts = require("../models/Posts");

router.post('/allcomments',async(req,res)=>{
    const {Topic,ch}=req.body;
    const data=await Posts.find({"Topic" : Topic},
{"comments":{$elemMatch: {ch:ch}}})

res.send(data);
})

router.post('/savecomment',async(req,res)=>{
const {username,message,Topic,ch}=req.body;
//console.log(username,message,Topic,ch)
  const com=await Posts.updateOne({"Topic":Topic,"comments.ch":ch},
{$push:{"comments.$.comment":{"username":username,"comment":message}}})

res.send(com);



})
router.post('/deleteacomment',async(req,res)=>{
  const {topic,ch,username,comment}=req.body;
  const deleted=await Posts.updateOne({"Topic":topic,"comments.ch":ch},
  {$pull:{"comments.$.comment":{"username":username,"comment":comment}}})
  res.send(deleted);
})



module.exports = router;