const express=require('express')//return a methode
//calling express methode
const app=express() //express methode return an object assign to a variable app

const authRouter=require('./controller/authController')
const userRouter=require('./controller/userController')
const chatRouter=require('./controller/chatController')
const messageRouter=require('./controller/messageController')
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)

module.exports=app;