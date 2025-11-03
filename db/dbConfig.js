import mongoose from "mongoose";


export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        .then(()=>console.log("db connected successfully"))
        .catch((err)=>console.log(err));
    } catch (error) {
        console.log(error);
    }
}


