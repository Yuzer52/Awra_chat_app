import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import CreateGroup from "../chatList/createGroup/createGroup";
import "./UserInfo.css";

const Userinfo = () => {
  const { currentUser } = useUserStore();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);

  // Function to toggle the CreateGroup component
  const handleEditClick = () => {
    setShowCreateGroup(!showCreateGroup);
  };

  // Function to toggle the settings dropdown
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Function to open the Update Info form
  const handleUpdateInfoClick = () => {
    setShowUpdateInfo(true);
    setShowSettings(false); // Close settings dropdown
  };

  // Function to open the Change Avatar form
  const handleChangeAvatarClick = () => {
    setShowChangeAvatar(true);
    setShowSettings(false); // Close settings dropdown
  };

  // Function to handle avatar file selection
  const handleFileChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  // Function to save updated user information to Firebase
  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, {
        username,
        password,
      });
      alert("User info updated successfully!");
      setShowUpdateInfo(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  // Function to save updated avatar to Firebase
  const handleSaveAvatar = async () => {
    try {
      if (newAvatar) {
        const userDocRef = doc(db, "users", currentUser.id);
        const avatarURL = URL.createObjectURL(newAvatar); // This is for demonstration; in a real app, upload to storage
        await updateDoc(userDocRef, {
          avatar: avatarURL,
        });
        alert("Avatar updated successfully!");
        setShowChangeAvatar(false);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="User Avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="More" onClick={toggleSettings} title="Settings"/>
        <img src="./video.png" alt="Video" />
        <img src="./group.png" alt="Edit" onClick={handleEditClick} title="Create A Group" />
      </div>
      
      {/* Conditionally render CreateGroup if showCreateGroup is true */}
      {showCreateGroup && <CreateGroup onCreateGroup={() => setShowCreateGroup(false)} />}

      {/* Conditionally render the settings dropdown */}
      {showSettings && (
        <div className="settingsDropdown">
          <div className="dropdownItem" onClick={handleUpdateInfoClick}>Update Info</div>
          <div className="dropdownItem" onClick={handleChangeAvatarClick}>Change Avatar</div>
          <div className="dropdownItem">Change Bio</div>
          <div className="dropdownItem">Delete Account</div>
          <div className="dropdownItem">Privacy & Policy</div>
        </div>
      )}

      {/* Conditionally render Update Info form */}
      {showUpdateInfo && (
        <div className="updateInfo">
          <h3>Update Information</h3>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowUpdateInfo(false)}>Cancel</button>
        </div>
      )}

      {/* Conditionally render Change Avatar form */}
      {showChangeAvatar && (
        <div className="updateInfo">
          <h3>Change Avatar</h3>
          <img src={currentUser.avatar || "./avatar.png"} alt="Current Avatar" className="currentAvatar" />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <button onClick={handleSaveAvatar}>Save</button>
          <button onClick={() => setShowChangeAvatar(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
