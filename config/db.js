const mongoose =require("mongoose")
const colors=require("colors")
const connectDB=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('====================================')
    console.log(`connected to database ${mongoose.connection.host}`.bgCyan.white)
    console.log('====================================')
} catch (error) {
    console.log('====================================');
    console.log(`error in mongoDB ${error}`.bgRed.white);
    console.log('====================================');
}
}
module.exports=connectDB
