import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createNewMessage, getAllMessages } from '../apicalls/message'
import { useSearchParams } from 'react-router-dom'

const ChatArea = () => {
  const {selectedChat,user,allUsers}=useSelector(state=>state.userReducer)
   //const dispatch=useDispatch()
   const [message,setMessage]=useState('')
   const [allMessages,setAllMessages]=useState([])
  console.log("...........",selectedChat)
   // const selectedUser = selectedChat?.members.find( u =>( u._id||u) !== user._id);
   const selectedUserId = selectedChat?.members.find(
  u => (u._id || u) !== user._id
);

const selectedUser = allUsers.find(
  u => u._id === (selectedUserId._id || selectedUserId)
);
  console.log(selectedChat)

const sendMessage=async ()=>{
  try {
    const NewMessage={
      chatId:selectedChat._id,
      sender:user._id,
      text:message

    }
    const response=await createNewMessage(NewMessage)
    if(response.success)
    {
      setMessage('')
    }
  } catch (error) {
    toast.error(error.message)
  }
}

const getMessages=async ()=>{
  try {
    console.log("getAllMessages called");
    const response=await getAllMessages(selectedChat._id)
    if(response.success)
    {
      setAllMessages(response.data)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
useEffect(()=>{
  getMessages()
},[selectedChat])
  return (
    <>{selectedChat&&<div className="app-chat-area">
  <div className="app-chat-area-header">
     
      {selectedUser?.firstName}{selectedUser?.lastName}
  </div>
  <div className='main-chat-area'>
   
 <div className="message-container" >
      {allMessages.map((msg) => {
        console.log("sender:", msg.sender);
console.log("currentUser:", user._id);
  const isCurrentUserSender =
    String(msg.sender._id || msg.sender) === String(user._id);

  return (
    <div
      key={msg._id}
      className="message-container"
      style={{
        justifyContent: isCurrentUserSender
          ? "flex-end"
          : "flex-start",
      }}
    >
      <div
        className={
          isCurrentUserSender
            ? "send-message"
            : "received-message"
        }
      >
        {msg.text}
      </div>
    </div>
  );
})}
    </div>  
  </div>
  <div className="send-message-div">
    <input type="text"
     className="send-message-input"
     placeholder="Type a message" 
     value={message}
     onChange={(e)=>{setMessage(e.target.value)}}/>
    <button className="fa fa-paper-plane send-message-btn" aria-hidden="true" onClick={sendMessage}></button>
</div>
</div>}</>
  )

}
export default ChatArea