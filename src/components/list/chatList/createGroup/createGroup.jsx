import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useChatStore } from "../../../../lib/chatStore";
import { db } from "../../../../lib/firebase";
import "./createGroup.css"; // Import your CSS styles here

const CreateGroup = ({ onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [groupCreated, setGroupCreated] = useState(false);

  const { changeChat } = useChatStore();

  // Function to handle group creation
  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;

    try {
      const groupId = `${groupName}-${Date.now()}`; // Unique ID based on the group name and timestamp
      const groupDocRef = doc(db, "groups", groupId);

      await setDoc(groupDocRef, {
        groupName: groupName,
        createdAt: serverTimestamp(),
        members: [],
        messages: [],
      });

      setGroupCreated(true);
      changeChat(groupId, { groupName });
    } catch (err) {
      console.log(err);
    }
  };

  const firstLetter = groupName.charAt(0).toUpperCase();

  return (
    <div className="createGroup">
      <div className="groupHeader">
        <div className="groupProfile">
          {/* Profile picture with the first letter of the group */}
          <div className="groupAvatar">{firstLetter || "G"}</div>
        </div>
        <div className="groupInfo">
          <input
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button className="createBtn" onClick={handleCreateGroup}>
            Create Group
          </button>
        </div>
      </div>

      {groupCreated && (
        <div className="chatDisplay">
          <div className="chatTop">
            <h3>{groupName}</h3>
            <button
              className="addUserBtn"
              title="Add a user to the group"
              onClick={onCreateGroup}
            >
              +
            </button>
          </div>
          <div className="groupDescription">
            <p>{`Group created: ${groupName}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
