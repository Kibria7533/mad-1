const router = require('express').Router();
const Courses = require("../models/Course");
const path = require("path");
const multer = require("multer");
const {body, check, validationResult } = require('express-validator');

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
 

 router.post('/addcourse', function (req, res) {

    upload(req, res, function (err) {
      
       const course = new Courses({
          title:req.body.title,
          text:req.body.text,
          courseLink:req.body.courseLink,
          image:req.file.filename,  
       })
       course.save().then(data=>{
          res.send(200)
       }).catch(error=>{
          res.send('errr')
       })
      
 
    })
 })

 router.get('/getcourse',async(req,res)=>{
    const data=await Courses.find({});
    res.send(data);
 })
 router.delete('/deletecourse/:id',async(req,res)=>{
   
   const data=await Courses.deleteOne({_id:req.params.id});
   res.send(data);
})

router.post('/editcourse/:id', function (req, res) {

   upload(req, res,async (err) =>{
      
      if(typeof req.file=== "undefined"){
         const data= await Courses.updateOne({_id:req.params.id},{$set:{title:req.body.title,
            text:req.body.text,
            courseLink:req.body.courseLink,
           }});
           res.send(data);
      }
      else{
         const data= await Courses.updateOne({_id:req.params.id},{$set:{title:req.body.title,
            text:req.body.text,
            courseLink:req.body.courseLink,
            image:req.file.filename
             }});
             res.send(data);
      }
     
     
     

   })
})


 
module.exports = router;