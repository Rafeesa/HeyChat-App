import React from 'react'

import { useSelector } from 'react-redux'

const ChatArea = () => {
  const {selectedChat,user,allUsers}=useSelector(state=>state.userReducer)
   
  console.log("...........",selectedChat)
   // const selectedUser = selectedChat?.members.find( u =>( u._id||u) !== user._id);
   const selectedUserId = selectedChat?.members.find(
  u => (u._id || u) !== user._id
);

const selectedUser = allUsers.find(
  u => u._id === (selectedUserId._id || selectedUserId)
);
  console.log(selectedChat)
  return (
    <>{selectedChat&&<div className="app-chat-area">
  <div className="app-chat-area-header">
     
      {selectedUser?.firstName}{selectedUser?.lastName}
  </div>
  <div>
   
    CHAT AREA
  </div>
  <div>
     
      SEND MESSAGE
  </div>
</div>}</>
  )
}

export default ChatArea