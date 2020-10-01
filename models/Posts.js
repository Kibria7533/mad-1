const { Schema, model } = require("mongoose");
const PostSchema = new Schema({
  "Topic":String,
  "posts":[{
      "ch":String,
      "intro":String,
      "code":String,
      "blogtext":String
  }],
  "comments":[{
    "ch":String,
    "username":String,
    "comment":[]
}],
"reletedposts":[{
  "ch":String,
  "reletedpost":[]
}
]
})

module.exports = model("Posts", PostSchema);