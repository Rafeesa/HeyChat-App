import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../apicalls/chat";
import { setAllChats, setSelectedChats } from "../redux/userSlice";

import toast from "react-hot-toast";

const UsersList = ({ searchkey }) => {
  const {
    allUsers,
    allChats,
    user: currentUser,
    selectedChat
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const startNewChat = async (searchUserId) => {
    let response;
    try {
      response = await createNewChat([currentUser._id, searchUserId]);

      if (response.success) {
        toast.success(response.message);
        const newChat = response.data;
        const updatedChat = [...allChats, newChat];
        dispatch(setAllChats(updatedChat));
        dispatch(setSelectedChats(newChat));
      }
    } catch (error) {
      toast.error(error.message || "something went wrong");
    }
  };
  const openChat = (selectedUserId) => {
    const chat = allChats.find(
      (chat) =>
        chat.members.map((m) => m._id || m).includes(currentUser._id) &&
        chat.members.map((m) => m._id || m).includes(selectedUserId),
    );
    if (chat) {
      dispatch(setSelectedChats(chat));
    }
  };

   const IsSelectedChat = (user) => {
        if(selectedChat){
            return selectedChat.members.map(m => m._id).includes(user._id);
        }
        return false;
    }

  return allUsers
    .filter((user) => {
      return (
        ((user.firstName?.toLowerCase().includes(searchkey?.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchkey?.toLowerCase())) &&
          searchkey) ||
        allChats.some((chat) =>
          chat.members.map((m) => m._id).includes(user._id),
        )
      );
    })
    .map((user) => {
      return (
        <div
          className="user-search-filter"
          onClick={() => openChat(user._id)}
          key={user._id}
        >
          <div className={IsSelectedChat(user)?"filtered-user":"selected-user"}>
            <div className="filter-user-display">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  className="user-profile-image"
                />
              )}
              {!user.profilePic && (
                <div className="user-default-profile-pic">
                  {user.firstName.charAt(0).toUpperCase() +
                    user.lastName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">
                  {user.firstName + " " + user.lastName}
                </div>
                <div className="user-display-email">{user.email}</div>
              </div>
              {!allChats.some((chat) => {
                const memberIds = chat.members.map((m) => m._id || m);

                return (
                  memberIds.includes(currentUser._id) &&
                  memberIds.includes(user._id)
                );
              }) && (
                <div className="user-start-chat">
                  <button
                    className="user-start-chat-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      startNewChat(user._id);
                    }}
                  >
                    Start Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
};

export default UsersList;
