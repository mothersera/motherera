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
  limit,
  Timestamp,
  setDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define strict interfaces for type safety
export interface Conversation {
  id: string;
  participants: string[];
  participantKey: string;
  lastMessage: string;
  lastMessageTime: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  otherUser?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: Timestamp;
}

/**
 * Creates or retrieves an existing conversation between two users.
 * Uses a deterministic key (participantKey) to prevent duplicates.
 */
export async function getOrCreateConversation(currentUserId: string, targetUserId: string): Promise<Conversation> {
  if (!currentUserId || !targetUserId) throw new Error("Invalid user IDs");
  if (!db) throw new Error("Firestore not initialized");

  // Deterministic key: always sorted "ID1_ID2"
  const participantKey = [currentUserId, targetUserId].sort().join("_");

  // 1. Check if conversation already exists by key
  const q = query(
    collection(db, "conversations"),
    where("participantKey", "==", participantKey),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docData = snapshot.docs[0].data();
    return { 
      id: snapshot.docs[0].id, 
      ...docData 
    } as Conversation;
  }

  // 2. If not found, create new conversation
  const newConversationData = {
    participants: [currentUserId, targetUserId],
    participantKey,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastMessage: "",
    lastMessageTime: null
  };

  // We use addDoc to let Firestore generate the ID, or we could use setDoc with the key as ID
  // Using addDoc is standard, but querying by key is what ensures uniqueness.
  const docRef = await addDoc(collection(db, "conversations"), newConversationData);
  
  // Return the new object (with optimistic timestamps for immediate UI use)
  return {
    id: docRef.id,
    ...newConversationData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    lastMessageTime: null
  } as Conversation;
}

/**
 * Sends a message to a specific conversation.
 * Updates the messages subcollection AND the parent conversation document.
 */
export async function sendMessage(conversationId: string, senderId: string, text: string) {
  if (!text.trim()) return;
  
  const conversationRef = doc(db, "conversations", conversationId);
  const messagesRef = collection(db, "conversations", conversationId, "messages");

  // 1. Add message to subcollection
  await addDoc(messagesRef, {
    senderId,
    text,
    createdAt: serverTimestamp()
  });

  // 2. Update parent conversation with last message
  await updateDoc(conversationRef, {
    lastMessage: text,
    lastMessageTime: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

/**
 * Subscribes to the list of conversations for a specific user.
 * Automatically fetches the "other user" details from your API.
 */
export function subscribeToConversations(userId: string, callback: (conversations: Conversation[]) => void) {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", userId)
    // We sort client-side to avoid complex index requirements initially
  );

  return onSnapshot(q, async (snapshot) => {
    const conversations = await Promise.all(snapshot.docs.map(async (docSnapshot) => {
      const data = docSnapshot.data();
      const otherUserId = data.participants.find((id: string) => id !== userId);
      
      let otherUser = { id: otherUserId, name: "User", avatar: "" };

      // Fetch user details from MongoDB API
      if (otherUserId) {
        try {
          const res = await fetch(`/api/users/${otherUserId}`);
          if (res.ok) {
            const userData = await res.json();
            otherUser = {
              id: otherUserId,
              name: userData.name || "User",
              avatar: userData.image || ""
            };
          }
        } catch (e) {
          console.error("Failed to fetch user details", e);
        }
      }

      return {
        id: docSnapshot.id,
        ...data,
        otherUser
      } as Conversation;
    }));

    // Sort by updatedAt desc
    conversations.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || 0;
      const timeB = b.updatedAt?.toMillis?.() || 0;
      return timeB - timeA;
    });

    callback(conversations);
  });
}

/**
 * Subscribes to real-time messages for a specific conversation.
 */
export function subscribeToMessages(conversationId: string, callback: (messages: Message[]) => void) {
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    callback(messages);
  });
}
