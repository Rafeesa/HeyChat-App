import React from 'react'
import { useSelector } from 'react-redux'


const UsersList = ({searchkey}) => {
    const {allUsers}=useSelector(state=>state.userReducer)
  return (
     allUsers.filter(user => {
                return (user.firstName?.toLowerCase().includes(searchkey?.toLowerCase()) ||
                    user.lastName?.toLowerCase().includes(searchkey?.toLowerCase()))&&searchkey
            }).map(user=>{
        return (<div class="user-search-filter">
   <div className="filtered-user">
       <div class="filter-user-display">
            {user.profilePic && <img src={user.profilePic} alt="Profile Pic" class="user-profile-image" />}
           {!user.profilePic && <div class="user-default-profile-pic">
             {user.firstName.charAt(0).toUpperCase()+user.lastName.charAt(0).toUpperCase()}
           </div>}
           <div class="filter-user-details">
               <div class="user-display-name">{user.firstName+' '+user.lastName}</div>
                   <div class="user-display-email">{user.email}</div>
               </div>
               <div class="user-start-chat">
                  <button class="user-start-chat-btn">Start Chat</button>
               </div>
           </div>
       </div>                        
   </div>)
    })

  )
}

export default UsersList