//create post

const postModel = require("../models/postModel");

const createPostController=async(req,res)=>{
    try {
        const {title,description}=req.body
        //validate
        if(!title || !description){
            res.status(500).send({
                success:false,
                message:"Please provides All Fields"
            })
        }
        //save data
      
        const post=await postModel({
            title,
            description,
            postedBy:req.auth._id,
           
        }).save()
        res.status(201).send({
            success:true,
            message:"Post Created Successfully",
            post,
        })
      
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"Error In Create Post Api",
            error
        })
    }
};
//get all posts
const getAllPostsController=async(req,res)=>{
    try {
        const posts =await postModel.find().populate("postedBy", "_id name").sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"All Post Data",
            posts,
        })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"Error In GETALLPOST API",
        error,
      })  

    }
}
//get user post
const getUserPostsController =async(req,res)=>{

    try {
        const UserPosts= await postModel.find({postedBy: req.auth._id})
        
        res.status(200).send({
            success:true,
            message:"user posts",
            UserPosts,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in user POST API",
            error,
        })
    }
}
//delete post
const deletePostController=async(req,res)=>{
try {
    const {id}=req.params
    await postModel.findByIdAndDelete({_id:id})
    res.status(200).send({
        success:true,
        message:"your post has been deleted"
    })
} catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.status(500).send({
        success:false,
        message: "error in delete post api",
        error,
    })
}
}
//delete post
const updatePostController=async(req,res)=>{
try {
 const {title,description}=req.body
 //post find
 const post =await postModel.findById({_id:req.params.id})
 //validation
 if(!title || !description){
    return res.status(500).send({
        success:false,
        message:"please provide post title or description"
    })
 }
 const updatedPost =await postModel.findByIdAndUpdate({_id:req.params.id},{
    title:title || post?.title,
    description:description || post?.description
 },{new:true})
 res.status(200).send({
    success:true,
    message:"Post Updated Successfully",
    updatedPost,
 })
} catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    res.status(500).send({
        success:false,
        message: "error in Update post api",
        error,
    })
}
}
module.exports ={createPostController, getAllPostsController,getUserPostsController,deletePostController,updatePostController}