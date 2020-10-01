const router = require('express').Router();
const Posts = require("../models/Posts");

router.post('/createtopic', (req, res) => {
  const { Topic } = req.body;
  const newpost = new Posts({
    "Topic": Topic
  });
  newpost.save((err, data) => {
    if (err)
      throw res.send("data cant be save");
    console.log(data);
  })
  res.json({
    msg: "a topic has been created"
  });
})
router.get('/getalltopics', async (req, res) => {
  const data = await Posts.find({}, { Topic: 1 })
  res.send(data);
});
router.get('/getall', async (req, res) => {
  const alldata = await Posts.find({}, { comments: 0, reletedposts: 0, _id: 0 })
  res.send(alldata);

});
router.post('/removetopic', async (req, res) => {
  const { Topic } = req.body;
  const data = await Posts.deleteOne({ "Topic": Topic })
  res.send(data);
})
router.post('/edittopic', async (req, res) => {
  const { Topic, newtopic } = req.body;
  await Posts.updateOne({ "Topic": Topic },
    { $set: { "Topic": newtopic } });
})

router.post('/createchapter',  (req, res) => {
  const { Topic, ch, intro, code, blogtext } = req.body;
  Posts.updateOne({ "Topic": Topic },
    { $push: { posts: { "ch": ch, "intro": intro, "code": code, "blogtext": blogtext } } }).then(suc=>{
      Posts.updateOne({ "Topic": Topic },
      { $push: { comments: { "ch": ch } } }).then(data=>{
        Posts.updateOne({ "Topic": Topic },
        { $push: { reletedposts: { "ch": ch } } }).then(final=>{
          res.send('chapter created');
        })
      })
    })
   
 
   
   
})
router.post('/updatechapter', async (req, res) => {
  const { Topic, ch, ech, eintro, ecode, eblogtext } = req.body;
  const data = await Posts.updateOne({ "Topic": Topic, "posts.ch": ch },
    { $set: { "posts.$.ch": ech, "posts.$.intro": eintro, "posts.$.code": ecode, "posts.$.blogtext": eblogtext } })

  res.send(data);

})

router.post('/deletechapter', async (req, res) => {
  const { topic, ch } = req.body;
  const data = await Posts.updateOne({ "Topic": topic, "posts.ch": ch },
    { $pull: { posts: { "ch": ch } } })
  res.send(data);
})
router.post('/getchapter', async (req, res) => {
  const { Topic, ch } = req.body;
  const chdata = await Posts.find({ "Topic": Topic },
    { _id: 0, "posts": { $elemMatch: { ch: ch } } })
  res.send(chdata);
})

router.post('/allchapter/:topic', async (req, res) => {
  const topic = req.params.topic;

  const chapter = await Posts.find({ Topic: topic }, { _id: 0, "posts.ch": 1 })
  res.send(chapter);
})



module.exports = router;