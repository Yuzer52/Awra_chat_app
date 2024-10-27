import React from "react";
import ChatList from "./chatList/ChatList";
import "./list.css";
import Userinfo from "./userInfo/Userinfo";

const List = () => {
  // Function to handle group creation (can be expanded later)
  const handleCreateGroup = () => {
    console.log("Create group clicked");
    // Logic for creating a group goes here
  };

  return (
    <div className="list">
      <Userinfo />
      <ChatList />
    </div>
  );
};

export default List;
