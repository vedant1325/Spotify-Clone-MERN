import mongoose from "mongoose";


const connectDB=async()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Connection Established")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/Spotify`)
}
export default connectDB;