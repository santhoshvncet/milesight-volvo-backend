import UserData from '../models/userModel.js'
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const getAllUser=async(req,res)=>{
    try {
        const data = await UserData.find().select('-password');
        res.status(200).json({
            message: 'Users fetched successfully!!!!!',
            totalUsers: data.length,
            data
        })

    } catch (error) {
        res.json({
            message:error
        })
    }
}

const genToken = (userId)=> {
    const token =   jwt.sign({id:userId},process.env.JWT_SECRETE_KEY,{expiresIn:'7d'})
    return  token
}


export const register = async(req,res)=>{
   const {userName,email,password} = req.body;
    try {
        const isEmail  = await UserData.findOne({email});
        if(isEmail){
            res.status(400).json({
                message:"email already registered"
            })
        }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await UserData.create({
            userName:userName,
            email:email,
            password:hashedPassword
        })


        const token = genToken(user._id);
        res.cookie('token',token,
            {
                httpOnly:true,
                maxAge:24*60*60*1000
            }
        )

        // const token = genToken(user._id);
        // res.cookie('token',token,{
        //     httpOnly:true,
        //     maxAge: 24 * 60 * 60 * 1000
        // })
        res.status(201).json({
            _id:user._id,
            userName,
            email,            
        })
    }
    } catch (error){
        console.log(error)
    } 
}

export const login = async(req,res)=>{
    const{email , password} = req.body;

    try {
        const user = await UserData.findOne({email});
        if(!user){
            res.status(400).json({
                message:"not register please register"
            })
        }
        const token = genToken(user._id);
        const userId =user._id;
    res.cookie('token', token, {
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 
    });
    if(user){
            const isMatched = await bcrypt.compare(password,user.password);
            if(isMatched){
                res.status(200).json({
                    userId,
                    message:"logged in successfully"
                })
            }

        }
    } catch (error) {
        res.status(400).json({
            message:"error in logging",error
        })    
    }
}

// export const getUserById =()=>{
// }



export const logout = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserData.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // await UserData.findOneAndDelete({ email });
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });

    return res.status(200).json({ message: "Logout out successful" });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
