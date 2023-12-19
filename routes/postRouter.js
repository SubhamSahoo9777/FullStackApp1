const express=require("express")
const { requireSignIn } = require("../controllers/userController")
const { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController } = require("../controllers/postController")

//router object
const router =express.Router()

//create post || post
router.post("/create-post", requireSignIn , createPostController)
//get all post
router.get("/get-all-post",getAllPostsController)
//get User POSTs
router.get("/get-all-posts",requireSignIn,getUserPostsController)
//delete
router.delete("/delete-post/:id",requireSignIn,deletePostController)
//update post
router.put("/update-post/:id",requireSignIn,updatePostController)

//export
module.exports =router