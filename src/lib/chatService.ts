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
  setDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define strict interfaces for type safety
export interface Conversation {
  id: string;
  participants: string[];
  participantKey: string;
  lastMessage: string;
  lastMessageTime: Timestamp | null;
  lastSenderId?: string; // Track who sent the last message
  typingUsers?: string[]; // Array of user IDs currently typing
  hiddenFor?: string[]; // Array of user IDs who have deleted this conversation
  createdAt: Timestamp;
  updatedAt: Timestamp;
  otherUser?: {
    id: string;
    name: string;
    avatar: string;
  };
  unreadCount?: number; // Calculated on client or stored
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

  // 1. Check if conversation already exists by key OR by ID (since we now use key as ID)
  // This step is somewhat redundant if we use setDoc/getDoc on the key directly,
  // but good for legacy checks.
  const participantKey = [currentUserId, targetUserId].sort().join("_");
  
  // Try to fetch by ID directly first (most efficient)
  const docRef = doc(db, "conversations", participantKey);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
     return { id: docSnap.id, ...docSnap.data() } as Conversation;
  }

  // Fallback: Check if there's any legacy conversation with this key but different ID
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
    lastMessageTime: null,
    typingUsers: []
  };

  // Check one last time before creating to prevent race conditions
  // We can use the participantKey as the Document ID to force uniqueness at the database level!
  // This is the most robust way to prevent duplicates.
  try {
    const docRef = doc(db, "conversations", participantKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       return { id: docSnap.id, ...docSnap.data() } as Conversation;
    }

    await setDoc(docRef, newConversationData);
    
    return {
      id: participantKey,
      ...newConversationData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastMessageTime: null
    } as Conversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
}

/**
 * Temporary utility to clean up duplicate conversations.
 * Should be called once or periodically to fix bad data.
 */
export async function cleanupDuplicateConversations(userId: string) {
    if (!db) return;
    
    // Get all conversations for this user
    const q = query(collection(db, "conversations"), where("participants", "array-contains", userId));
    const snapshot = await getDocs(q);
    
    const conversations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
    
    // Group by participantKey
    const groups: { [key: string]: any[] } = {};
    
    conversations.forEach(conv => {
        // If legacy conversation without key, generate it
        const key = conv.participantKey || conv.participants.sort().join("_");
        if (!groups[key]) groups[key] = [];
        groups[key].push(conv);
    });
    
    // Find groups with duplicates
    for (const key in groups) {
        if (groups[key].length > 1) {
            console.log(`Found duplicates for ${key}:`, groups[key].length);
            
            // Sort by createdAt/updatedAt to keep the oldest or most active?
            // Let's keep the one with the most recent update (most likely active)
            // OR keep the one that matches the key format if we are migrating.
            
            // Sort by updatedAt descending
            groups[key].sort((a, b) => {
                const timeA = a.updatedAt?.seconds || 0;
                const timeB = b.updatedAt?.seconds || 0;
                return timeB - timeA;
            });
            
            const keeper = groups[key][0];
            const toDelete = groups[key].slice(1);
            
            console.log(`Keeping ${keeper.id}, deleting ${toDelete.length} others`);
            
            // Delete duplicates
            const { deleteDoc, doc } = await import("firebase/firestore");
            for (const dup of toDelete) {
                await deleteDoc(doc(db, "conversations", dup.id));
            }
        }
    }
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
  // Also remove the current user from hiddenFor if they are sending a message
  // And remove the other user from hiddenFor so they see the new message
  const chatDoc = await getDoc(conversationRef);
  const participants = chatDoc.data()?.participants || [];
  
  await updateDoc(conversationRef, {
    lastMessage: text,
    lastMessageTime: serverTimestamp(),
    lastSenderId: senderId,
    updatedAt: serverTimestamp(),
    hiddenFor: [] // Unhide for everyone when a new message is sent
  });
}

/**
 * Hides a conversation for a specific user (soft delete).
 */
export async function hideConversation(conversationId: string, userId: string) {
  if (!db || !conversationId || !userId) return;
  
  const conversationRef = doc(db, "conversations", conversationId);
  try {
    await updateDoc(conversationRef, {
      hiddenFor: arrayUnion(userId)
    });
  } catch (error) {
    console.error("Error hiding conversation:", error);
  }
}

/**
 * Updates the typing status of a user in a conversation.
 */
export async function setTypingStatus(conversationId: string, userId: string, isTyping: boolean) {
  if (!db || !conversationId || !userId) return;
  
  const conversationRef = doc(db, "conversations", conversationId);
  try {
    await updateDoc(conversationRef, {
      typingUsers: isTyping ? arrayUnion(userId) : arrayRemove(userId)
    });
  } catch (error) {
    console.error("Error updating typing status:", error);
  }
}

/**
 * Marks a conversation as read by the current user.
 * Stores the read receipt in a subcollection.
 */
export async function markAsRead(conversationId: string, userId: string) {
  if (!db || !conversationId || !userId) return;
  
  const receiptRef = doc(db, "conversations", conversationId, "readReceipts", userId);
  try {
    await setDoc(receiptRef, {
      lastReadAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("Error marking as read:", error);
  }
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
      
      // Skip if hidden for this user
      if (data.hiddenFor && data.hiddenFor.includes(userId)) {
          return null;
      }

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

      // Calculate unread status locally for now (simplified)
      // For a robust system, we would query the readReceipts subcollection here.
      // A quick check: if I am not the last sender, and there is a last message, it might be unread.
      let unreadCount = 0;
      if (data.lastSenderId && data.lastSenderId !== userId) {
          // We'll fetch the actual read receipt to be accurate
          try {
              const receiptRef = doc(db, "conversations", docSnapshot.id, "readReceipts", userId);
              const receiptSnap = await getDoc(receiptRef);
              const lastReadAt = receiptSnap.exists() ? receiptSnap.data().lastReadAt : null;
              
              if (!lastReadAt || (data.lastMessageTime && data.lastMessageTime.toMillis() > lastReadAt.toMillis())) {
                  unreadCount = 1; // Simplified: just flag as unread (1) rather than counting all messages
              }
          } catch(e) { console.error(e) }
      }

      return {
        id: docSnapshot.id,
        ...data,
        otherUser,
        unreadCount
      } as Conversation;
    }));

    // Filter out nulls (hidden conversations)
    const validConversations = conversations.filter((c): c is Conversation => c !== null);

    // Sort by updatedAt desc
    validConversations.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || 0;
      const timeB = b.updatedAt?.toMillis?.() || 0;
      return timeB - timeA;
    });

    callback(validConversations);
  });
}

/**
 * Subscribes to real-time messages for a specific conversation.
 * Uses limit to lazy load messages and docChanges to optimize state updates.
 */
export function subscribeToMessages(conversationId: string, callback: (newMessages: Message[], isInitial: boolean) => void) {
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("createdAt", "desc"),
    limit(30)
  );

  let isInitial = true;

  return onSnapshot(q, (snapshot) => {
    if (isInitial) {
      // First load: send all documents reversed (so oldest first)
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message)).reverse();
      callback(messages, true);
      isInitial = false;
    } else {
      // Subsequent loads: only send added documents
      const newMessages = snapshot.docChanges()
        .filter(change => change.type === "added")
        .map(change => ({
          id: change.doc.id,
          ...change.doc.data()
        } as Message)).reverse();
        
      if (newMessages.length > 0) {
        callback(newMessages, false);
      }
    }
  });
}
