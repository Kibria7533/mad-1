const { Schema, model } = require("mongoose");

const CourseScheama=new Schema({
 title:String,
 text:String,
 courseLink:String,
 image:String
})
module.exports = model("Course", CourseScheama);