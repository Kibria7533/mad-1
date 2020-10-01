const { Schema, model } = require("mongoose");

const TeachersScheama=new Schema({
 title:String,
 text:String,
 degignation:String,
 image:String,
 websites:String
})
module.exports = model("Teachers", TeachersScheama);