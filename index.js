import express from 'express';
import {connectDb} from './db/dbConfig.js'
import cors from 'cors'
import 'dotenv/config';
import dataRouter from './routes/dataRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

// const redisClient = createClient();
// redisClient.on("error", (err) => console.log("Redis Error:", err));
// await redisClient.connect();
// console.log("✅ Redis connected");


app.get('/',(req,res)=>{
    res.send("hii there lsitening");
})

app.use(cookieParser())

app.use("/api/sensor",dataRouter);

app.use('/api/auth',userRouter);


app.get('/connect',(req,res)=>{
    res.send("listening");
})




app.listen(4000,()=>{
    console.log("app listening");
})



