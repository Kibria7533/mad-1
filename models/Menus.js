const { Schema, model } = require("mongoose");

const MenuScheama=new Schema({
 "menus":[],
 "menuwithsub":[{
   
    "name":String,
     "submenus":[]

 }],
 "menuwithmega":[
     {
       
        "name":String,
        "submenus":[]
     }
 ]
})
module.exports = model("Menus", MenuScheama);