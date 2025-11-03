import express from "express";
import { getAllData, getCapacityData, getInData, getOutData } from "../controllers/dataController.js";
import { protect } from "../middlewares/userMiddleware.js";


export const dataRouter = express.Router();




dataRouter.get('/', getAllData)
dataRouter.get('/data/in-count', getInData);
dataRouter.get('/data/out-count' , getOutData);
dataRouter.get('/data/capacity-count', getCapacityData);



export default dataRouter
