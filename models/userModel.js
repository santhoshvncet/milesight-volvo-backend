import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    userName :{
        type : String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    Timestamp:{
    type: Date,
    default: Date.now,
    }
})


export default mongoose.model("UserData", userSchema);