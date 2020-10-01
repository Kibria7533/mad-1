const path = require("path");
const multer = require("multer");
const Ques = require('../models/questions');
const router = require('express').Router();
const express=require('express');

const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function (req, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 1000000 },
}).single("myImage");


router.post('/upload', function (req, res) {

   upload(req, res, function (err) {
     
      const questons = new Ques({
         class: req.body.class,
         dept: req.body.dept,
         sub: req.body.sub,
         ch: req.body.ch,
         Type: req.body.type,
         img: req.file.filename,
         udiipok: req.body.udiipok,
         question: req.body.question,
         answer: req.body.answer,
      })
      questons.save().then(data=>{
         res.send(200)
      }).catch(error=>{
         res.send('errr')
      })
     

   })
})
router.post('/getallquestions',async(req,res)=>{

   const {classname,dept,sub,ch,Type}=req.body;
   

    const data= await Ques.find({$and:[{"class":classname},{"dept":dept},{"sub":sub},{"ch":ch},{"Type":Type}]})
 
   
    res.send(data);
})

router.post('/getallquestionsbynumber',async(req,res)=>{

   const {classname,dept,sub,ch,Type,number}=req.body;


    const data= await Ques.find({$and:[{"class":classname},{"dept":dept},{"sub":sub},{"ch":ch},{"Type":Type}]}).limit(parseInt(number))

   
    res.send(data);
})

module.exports = router;