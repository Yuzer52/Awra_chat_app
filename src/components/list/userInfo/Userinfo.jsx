import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import CreateGroup from "../chatList/createGroup/createGroup";
import "./UserInfo.css";
import PrivacyPolicy from "./privacy/PrivacyPolicy"; // Import the PrivacyPolicy component

const Userinfo = () => {
  const { currentUser } = useUserStore();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  const [showChangeBio, setShowChangeBio] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false); // State for Privacy Policy modal
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [bio, setBio] = useState(currentUser.bio || "");

  const handleEditClick = () => setShowCreateGroup(!showCreateGroup);
  const toggleSettings = () => setShowSettings(!showSettings);

  const handleUpdateInfoClick = () => {
    setShowUpdateInfo(true);
    setShowSettings(false);
  };

  const handlePrivacyPolicyClick = () => {
    setShowPrivacyPolicy(true); // Show Privacy Policy modal
  };

  const handleChangeAvatarClick = () => {
    setShowChangeAvatar(true);
    setShowSettings(false);
  };

  const handleChangeBioClick = () => {
    setShowChangeBio(true);
    setShowSettings(false);
  };

  const handleFileChange = (e) => setNewAvatar(e.target.files[0]);

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, { username, password });
      alert("User info updated successfully!");
      setShowUpdateInfo(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      if (newAvatar) {
        const userDocRef = doc(db, "users", currentUser.id);
        const avatarURL = URL.createObjectURL(newAvatar);
        await updateDoc(userDocRef, { avatar: avatarURL });
        alert("Avatar updated successfully!");
        setShowChangeAvatar(false);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleSaveBio = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, { bio });
      alert("Bio updated successfully!");
      setShowChangeBio(false);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const handleDeleteAccountClick = () => setShowDeleteConfirm(true);

  const confirmDeleteAccount = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.id);
      await deleteDoc(userDocRef);
      alert("Account deleted successfully!");
      // Log out or redirect the user here if necessary
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="User Avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="More" onClick={toggleSettings} title="Settings" />
        <img src="./video.png" alt="Video" />
        <img src="./group.png" alt="Edit" onClick={handleEditClick} title="Create A Group" />
      </div>

      {showCreateGroup && <CreateGroup onCreateGroup={() => setShowCreateGroup(false)} />}

      {showSettings && (
        <div className="settingsDropdown">
          <div className="dropdownItem" onClick={handleUpdateInfoClick}>Update Info</div>
          <div className="dropdownItem" onClick={handleChangeAvatarClick}>Change Avatar</div>
          <div className="dropdownItem" onClick={handleChangeBioClick}>Change Bio</div>
          <div className="dropdownItem" onClick={handleDeleteAccountClick}>Delete Account</div>
          <div className="dropdownItem" onClick={handlePrivacyPolicyClick}>Privacy & Policy</div>
        </div>
      )}

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

      {showChangeBio && (
        <div className="updateInfo">
          <h3>Change Bio</h3>
          <textarea 
            placeholder="Enter new bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
          />
          <button onClick={handleSaveBio}>Save</button>
          <button onClick={() => setShowChangeBio(false)}>Cancel</button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="deleteConfirm">
          <p>Are you sure you want to delete your account?</p>
          <p>You will not be able to recover the account if you delete it.</p>
          <button onClick={confirmDeleteAccount}>Yes, Delete</button>
          <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        </div>
      )}

      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} /> // Render the PrivacyPolicy component
      )}
    </div>
  );
};

export default Userinfo;
