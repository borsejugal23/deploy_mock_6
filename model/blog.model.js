const mongoose = require("mongoose");

const post_blog_Schema = mongoose.Schema(
    {
        title: String,
        date: Date,        
        category: String,
        content: String,
        creator:String,
        username: String
    },
    {
        versionKey: false
    }
);

const post_blog_Model = mongoose.model("blog", post_blog_Schema);

module.exports = { post_blog_Model };

    //   let obj=  {
    //     "title": "Sample Title 1",
    //     "date": new Date("2023-08-24"), 
    //     "category": "Technology",
    //     "content": "This is the content of the first blog post.",
    //     "username": "user1"
    // }