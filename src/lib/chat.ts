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
export async function getOrCreateChat(currentUserId: string, otherUserId: string): Promise<Chat> {
  const chatsRef = collection(db, "chats");

  // Query for existing chat
  const q = query(
    chatsRef,
    where("participants", "array-contains", currentUserId)
  );

  const querySnapshot = await getDocs(q);
  const existingChat = querySnapshot.docs.find(doc => {
    const data = doc.data();
    return data.participants.includes(otherUserId);
  });

  if (existingChat) {
    return { id: existingChat.id, ...existingChat.data() } as Chat;
  }

  // Create new chat
  const newChatData = {
    participants: [currentUserId, otherUserId],
    createdAt: serverTimestamp(),
    lastMessage: "",
    lastMessageTime: serverTimestamp(),
    unreadCount: { [currentUserId]: 0, [otherUserId]: 0 }
  };

  const docRef = await addDoc(chatsRef, newChatData);
  return { id: docRef.id, ...newChatData, createdAt: { seconds: Date.now() / 1000 } } as unknown as Chat;
}

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
    where("participants", "array-contains", userId)
    // Removed orderBy to avoid missing index issues. We sort in JS.
  );

  return onSnapshot(q, async (snapshot) => {
    const chatsPromises = snapshot.docs.map(async (docSnapshot) => {
      const data = docSnapshot.data();
      const otherUserId = data.participants.find((id: string) => id !== userId);
      
      // Fetch other user data
      let otherUserData = null;
      if (otherUserId) {
        try {
          // 1. Try fetching from our MongoDB API first (since that's where users are)
          const res = await fetch(`/api/users/${otherUserId}`);
          if (res.ok) {
            const userData = await res.json();
            otherUserData = { 
                id: otherUserId, 
                name: userData.name, 
                avatar: userData.image, 
                email: userData.email 
            };
          } else {
            // 2. Fallback to Firestore users collection if API fails (legacy/backup)
            const userDoc = await getDoc(doc(db, "users", otherUserId));
            if (userDoc.exists()) {
              otherUserData = { id: userDoc.id, ...userDoc.data() };
            }
          }
        } catch (e) {
          console.error("Error fetching user data", e);
        }
      }

      // If still no user data, provide a fallback
      if (!otherUserData) {
          otherUserData = { id: otherUserId, name: "User", avatar: null };
      }

      return {
        id: docSnapshot.id,
        ...data,
        otherUser: otherUserData
      } as Chat;
    });
    
    const chats = await Promise.all(chatsPromises);
    
    // Sort by lastMessageTime descending (client-side sort)
    chats.sort((a, b) => {
        const timeA = a.lastMessageTime?.seconds || 0;
        const timeB = b.lastMessageTime?.seconds || 0;
        return timeB - timeA;
    });

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
