"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { 
  signInAnonymously, 
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

    // 3. If session exists, check if we are already signed in
    if (auth.currentUser) {
      setFirebaseUser(auth.currentUser);
      setLoading(false);
      return;
    }

    // 4. If not signed in, sign in anonymously
    const signIn = async () => {
      try {
        setLoading(true);
        const userCredential = await signInAnonymously(auth);
        setFirebaseUser(userCredential.user);
      } catch (error) {
        console.error("Firebase auth error:", error);
      } finally {
        setLoading(false);
      }
    };

    signIn();
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
