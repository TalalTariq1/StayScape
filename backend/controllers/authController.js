const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const signup=async (req,res)=>{
    try{
    const {fullname,email,password,isAdmin}=req.body

    if(!fullname || !email || !password){
        return res.status(400).json({
            message:"Please fill all the fields"
        })
    }

    const existinguser=await User.findOne({email})
    if(existinguser){
            
        return res.status(400).json({
            message:"Email already registered"
        })
    }

    //hashing the password here
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)


    const user=await User.create({
        fullname,
        email,
        password:hashedPassword,
        isAdmin:isAdmin||false
    })

    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'7d'})

    res.status(201).json({
        status:"Success",
        token,
        user:{
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            isAdmin:user.isAdmin
        }

    })
    }catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }

}

const login = async (req,res)=>{
    try{
        const {email,password}=req.body
        if(!email|| !password){
            return res.status(400).json({
                message:"Please provide both email and password"
            })
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.status(200).json({
            status:"Success",
            token,
            user:{
                id:user._id,
                fullname:user.fullname,
                email:user.email,
                isAdmin:user.isAdmin
            }
        })

    }catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}


const logout=async (req,res)=>{
    try{
        res.status(200).json({
            status:"Success",
            message:"Logged out sucessfully"
        })
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports={signup,login,logout}