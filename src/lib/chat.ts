import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  onSnapshot,
  orderBy,
  getDoc,
  limit
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: any;
  createdAt: any;
  otherUser?: any; 
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: any;
}

// Create or get existing chat
export const getOrCreateChat = async (currentUserId: string, otherUserId: string) => {
  // Check if chat exists
  const q = query(
    collection(db, "chats"), 
    where("participants", "array-contains", currentUserId)
  );
  
  const snapshot = await getDocs(q);
  let existingChat = null;

  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (data.participants.includes(otherUserId)) {
      existingChat = { id: doc.id, ...data };
    }
  });

  if (existingChat) return existingChat;

  // Create new chat
  const chatRef = await addDoc(collection(db, "chats"), {
    participants: [currentUserId, otherUserId],
    createdAt: serverTimestamp(),
    lastMessage: "",
    lastMessageTime: serverTimestamp()
  });

  return { id: chatRef.id, participants: [currentUserId, otherUserId] };
};

export const blockUser = async (currentUserId: string, blockedUserId: string) => {
  await addDoc(collection(db, "blocked"), {
    blockerId: currentUserId,
    blockedId: blockedUserId,
    createdAt: serverTimestamp()
  });
};

export const isBlocked = async (senderId: string, receiverId: string) => {
  // Check if receiver blocked sender
  const q = query(
    collection(db, "blocked"),
    where("blockerId", "==", receiverId),
    where("blockedId", "==", senderId)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

// Send message
export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  if (!text.trim()) return;
  if (text.length > 500) throw new Error("Message too long (max 500 chars)");
  
  // Get chat to find the other participant
  const chatDoc = await getDoc(doc(db, "chats", chatId));
  if (!chatDoc.exists()) throw new Error("Chat not found");
  
  const participants = chatDoc.data().participants;
  const otherUserId = participants.find((id: string) => id !== senderId);

  // Check if blocked
  if (otherUserId) {
    const blocked = await isBlocked(senderId, otherUserId);
    if (blocked) throw new Error("You cannot send messages to this user.");
  }

  // Basic rate limit check
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(
    messagesRef, 
    where("senderId", "==", senderId), 
    orderBy("createdAt", "desc"), 
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const lastMsg = snapshot.docs[0].data();
    if (lastMsg.createdAt) {
      const now = Date.now();
      const lastTime = lastMsg.createdAt.toMillis ? lastMsg.createdAt.toMillis() : Date.now(); 
      // If within 1 second
      if (now - lastTime < 1000) {
        throw new Error("Please wait a moment before sending another message.");
      }
    }
  }

  await addDoc(messagesRef, {
    senderId,
    text,
    createdAt: serverTimestamp()
  });

  const chatRef = doc(db, "chats", chatId);
  await updateDoc(chatRef, {
    lastMessage: text,
    lastMessageTime: serverTimestamp()
  });
};

// Get user chats
export const subscribeToUserChats = (userId: string, callback: (chats: Chat[]) => void) => {
  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", userId),
    orderBy("lastMessageTime", "desc")
  );

  return onSnapshot(q, async (snapshot) => {
    const chats = await Promise.all(snapshot.docs.map(async (docSnapshot) => {
      const data = docSnapshot.data();
      const otherUserId = data.participants.find((id: string) => id !== userId);
      
      // Fetch other user data
      let otherUserData = null;
      if (otherUserId) {
        try {
          const userDoc = await getDoc(doc(db, "users", otherUserId));
          if (userDoc.exists()) {
            otherUserData = { id: userDoc.id, ...userDoc.data() };
          }
        } catch (e) {
          console.error("Error fetching user data", e);
        }
      }

      return {
        id: docSnapshot.id,
        ...data,
        otherUser: otherUserData
      } as Chat;
    }));
    
    callback(chats);
  });
};

// Get messages for a chat
export const subscribeToChatMessages = (chatId: string, callback: (messages: Message[]) => void) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    callback(messages);
  });
};

// Report user
export const reportUser = async (reporterId: string, reportedUserId: string, reason: string) => {
  await addDoc(collection(db, "reports"), {
    reporterId,
    reportedUserId,
    reason,
    createdAt: serverTimestamp()
  });
};
