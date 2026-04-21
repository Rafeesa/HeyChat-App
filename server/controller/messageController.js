const router=require('express').Router();
const authMiddleware=require('./../middlewares/authMiddleware')
const Chats=require('./../models/chat')
const Messages=require ('./../models/message')


router.post('/new-message',authMiddleware,async(req,res)=>{
    try {

        //store the message in the message model
        const newMessage=new Messages(req.body)
        const savedMessages=await newMessage.save()


        //update the last message in the chat collection

        // const currentChat=await Chats.findById(req.body.chatId)
        // currentChat.lastMessages=savedMessages._id
        // await currentChat.save()
        
        const currentChat=await Chats.findOneAndUpdate({
            _id:req.body.chatId,
        },{
            lastMessages:savedMessages._id,$inc:{unReadMessageCount:1}
        })

        res.status(201).send({
            message:"Message send successfully",
            success:true,
            data:savedMessages
        })

    } catch (error) {
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
})

router.get('/get-all-messages/:chatId',authMiddleware,async(req,res)=>{
    try {
        const allMessage=await Messages.find({chatId:req.params.chatId}).sort({createdAt:1})
        res.status(200).send({
            message:"messages fetched successfully",
            success:true,
            data:allMessage
        })
        
    } catch (error) {
        res.status(400).send({
            messages:error.message,
            success:false
        })
    }
})

module.exports=router