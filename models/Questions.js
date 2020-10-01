const {Schema,model}=require('mongoose');


const QuestionSchema=new Schema({
    "class":String,
    "dept":String,
    "sub":String,
    "ch":String,
    "Type":String,
    "img":String,
    "udiipok":String,
    "question":String,
    "answer":String
})

module.exports = model("questions", QuestionSchema);