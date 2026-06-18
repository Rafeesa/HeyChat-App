const express=require('express')//return a methode
//calling express methode
const app=express() //express methode return an object assign to a variable app

const authRouter=require('./controller/authController')
const userRouter=require('./controller/userController')
const chatRouter=require('./controller/chatController')
const messageRouter=require('./controller/messageController')
app.use(express.json())
const server=require('http').createServer(app)
const io=require('socket.io')(server,{cors:{
    origin:'http://localhost:5173',
    methods:['GET','POST']
}})

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)

//Test socket connection from client
io.on('connection',socket=>{
   // console.log('connected with socket Id: '+socket.id)
   socket.on('send-message-all',data=>{
    //console.log(data)
    socket.emit('send-message-by-server',"message from server :"+data.text)
   })
})

module.exports=server;