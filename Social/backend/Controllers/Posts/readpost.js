const Post = require("../../Schema/Post");


const readpost = async (req,res)=> {

   try {
      
     let postid=req.params.postid
     console.log(postid);
     let post=await Post.findById({"_id":postid})
     console.log(req.params);
     console.log(post);
     return res.json(post)
 
   } catch (error) {
    console.log("error in fetching",error);
   }
}

module.exports=readpost