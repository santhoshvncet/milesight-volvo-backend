import express from 'express'
import { getAllUser,  login, logout, register } from '../controllers/userController.js';
import { protect } from '../middlewares/userMiddleware.js';


const userRouter = express.Router();


userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/',getAllUser);
// userRouter.get('/{id}',getUserById);
userRouter.post('/logout',protect,logout);



export default userRouter