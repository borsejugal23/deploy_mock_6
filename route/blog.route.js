const express=require("express");
const { auth } = require("../middleware/auth.middleware");
const { post_blog_Model } = require("../model/blog.model");
const postBlogRouter=express.Router();

postBlogRouter.post("/blogs",auth,async(req,res)=>{
  try {
    const newpost= new post_blog_Model(req.body);
    await newpost.save();
    return res.status(200).json({msg:"new post added"})
  } catch (error) {
    res.status(500).json({error:error.message})

  }
})

 postBlogRouter.get("/", async (req, res) => {
    try {
       const loggedInUserPost = await post_blog_Model.find();
       return res.status(200).json({ loggedInUserPost: loggedInUserPost });
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
 });

 
 
 
 postBlogRouter.patch("/update/blogs/:postID", auth,async (req, res) => {
    const userIDinUserDoc = req.body.creator;
    try {
      const { postID } = req.params;

      const post = await post_blog_Model.findById({_id:postID});

      let userIDinpostDoc = post.creator;

      if (userIDinpostDoc === userIDinUserDoc) {

        await post_blog_Model.findByIdAndUpdate({_id:postID}, req.body);
        res.json({ msg: "post updated" });

      }
       else {

        res.json({ msg: "Not authorized" });
      }
    } 
    catch (error) {
      res.json({ error: error.message });
    }
});
  
postBlogRouter.delete("/delete/blogs/:postID",auth,async(req,res)=>{
    const userIDinUserDoc = req.body.creator;
    try {
      const { postID } = req.params;

      const post = await post_blog_Model.findById({_id:postID});

      let userIDinpostDoc = post.creator;

      if (userIDinpostDoc === userIDinUserDoc) {

        await post_blog_Model.findByIdAndDelete({_id:postID});
        res.json({ msg: "post deleted" });

      }
       else {
        res.json({ msg: "Not authorized" });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
});


module.exports={postBlogRouter}