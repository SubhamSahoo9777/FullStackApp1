const mongoose = require("mongoose")

//schema
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please Add The Post Title"]
    },
    description:{
        type:String,
        required:[true, "Please Add The Post Description"]
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    
},{timestamps:true})

module.exports= mongoose.model("Post", postSchema)