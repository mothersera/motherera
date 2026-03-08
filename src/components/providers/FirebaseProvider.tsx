"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { 
  signInWithCustomToken, 
  signOut, 
  User, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Firestore } from "firebase/firestore";

interface FirebaseContextType {
  firebaseUser: User | null;
  db: Firestore;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  firebaseUser: null,
  db: db,
  loading: true,
});

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 0. If Firebase not initialized
    if (!auth) {
        setLoading(false);
        return;
    }

    // 1. If session is loading, do nothing yet
    if (status === "loading") return;

    // 2. If no session, sign out of Firebase
    if (!session?.user) {
      if (auth.currentUser) {
        signOut(auth).then(() => {
          setFirebaseUser(null);
          setLoading(false);
        });
      } else {
        setFirebaseUser(null);
        setLoading(false);
      }
      return;
    }

    // 3. If session exists, check if we are already signed in to Firebase with the correct user
    // The uid from custom token should match session.user.id (or email if id is missing)
    const sessionUid = session.user.id || session.user.email;
    
    if (auth.currentUser?.uid === sessionUid) {
      setFirebaseUser(auth.currentUser);
      setLoading(false);
      return;
    }

    // 4. If not signed in or user mismatch, fetch custom token
    const syncFirebase = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/firebase-token", { 
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        
        if (!res.ok) {
          console.error("Failed to fetch Firebase token");
          setLoading(false);
          return;
        }
        
        const data = await res.json();
        if (data.token) {
          const userCredential = await signInWithCustomToken(auth, data.token);
          setFirebaseUser(userCredential.user);
        }
      } catch (error) {
        console.error("Firebase sync error:", error);
      } finally {
        setLoading(false);
      }
    };

    syncFirebase();
  }, [session, status]);

  // Listen for auth state changes to keep state in sync
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ firebaseUser, db, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);
