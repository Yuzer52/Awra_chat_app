import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useChatStore } from "../../../lib/chatStore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import AddUser from "./addUser/addUser";
import "./chatList.css";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [groups, setGroups] = useState([]); // State to store groups
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  // Fetch user chats
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  // Fetch groups created by the current user
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Query Firestore to fetch all group documents
        const groupsCollection = collection(db, "groups");
        const groupSnapshot = await getDocs(groupsCollection);
        const userGroups = [];
  
        groupSnapshot.forEach((doc) => {
          const groupData = doc.data();
          
          // Check if the current user is part of the group members
          if (groupData.members.includes(currentUser.id)) {
            userGroups.push({ groupId: doc.id, ...groupData });
            console.log("Groups fetched: ", userGroups);

          }
        });
  
        setGroups(userGroups); // Set the groups in state
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    };
  
    fetchGroups();
  }, [currentUser.id]);
  
  const handleSelect = async (chat) => {
    const userchats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userchats.findIndex((item) => item.chatId === chat.chatId);
    userchats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userchats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  const filteredGroups = groups.filter((g) =>
    g.groupName.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          title="Add a new User"
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((perv) => !perv)}
        />
      </div>

      {/* Display user chats */}
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "rgba(18, 27, 43, 0.653)",
          }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user.avatar || "./avatar.png"
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {/* Display groups created by the user */}
      <h4>Your Groups</h4>
      {filteredGroups.map((group) => (
        <div
          className="item"
          key={group.groupId}
          onClick={() => changeChat(group.groupId, group)}
          style={{ backgroundColor: "rgba(18, 27, 43, 0.653)" }}
        >
          <div className="texts">
            <span>{group.groupName}</span>
            <p>{group.lastMessage || "No messages yet"}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
