import { useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import CreateGroup from "../chatList/createGroup/createGroup"; // Adjust the path to where CreateGroup.jsx is located
import "./UserInfo.css";

const Userinfo = () => {
  const { currentUser } = useUserStore();
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // Function to toggle the CreateGroup component
  const handleEditClick = () => {
    setShowCreateGroup(!showCreateGroup);
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" onClick={handleEditClick} title="Create A Group"/>
      </div>
      {/* Conditionally render CreateGroup if showCreateGroup is true */}
      {showCreateGroup && <CreateGroup onCreateGroup={() => setShowCreateGroup(false)} />}
    </div>
  );
};

export default Userinfo;
