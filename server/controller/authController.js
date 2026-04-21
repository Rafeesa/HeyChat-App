const router=require('express').Router()
const User=require('./../models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

router.post('/signup',async(req,res)=>{
    try {
        const {firstName,lastName,email,password}=req.body
        
        const user=await User.findOne({email:email})
        if(user)
        {
            return res.send({
            message:'user already existed',
            success:false
        })
        }
        
      const hashPassword=await bcrypt.hash(password,10)
      
      const newUser=new User({
        firstName,
        lastName,
        email,
        password:hashPassword
      })
      await newUser.save()
      res.status(201).send({
        message:"user created successfully",
        success:true
      })
    } catch (error) {
        res.send({
            message:error.message,
            success:false
        })
        
    }
})

router.post('/login',async(req,res)=>{
 try {
  const {email,password}=req.body
  const user=await User.findOne({email:email})
  if(!user)
  {
    return res.send({
      message:"user doesn't exist",
      success:false
    })
  }
 const isValid=await bcrypt.compare(password,user.password)
 if(!isValid)
 {
   return res.send({
      message:"wrong user credentail",
      success:false
    })
 }
 const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
 res.send({
  message:"logged in successfully",
  success:true,
  token:token
 })

 } catch (error) {
  res.send({
    message:error.message,
    success:false
  })
 }
})

module.exports=router;