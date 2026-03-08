import * as admin from 'firebase-admin';

const initFirebaseAdmin = () => {
  if (!admin.apps.length) {
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        });
        console.log('Firebase Admin initialized successfully');
      } catch (error) {
        console.error('Firebase Admin initialization error', error);
      }
    } else {
        // During build time, env vars might be missing. 
        // We avoid crashing but functionality will fail if called.
        console.warn("Firebase Admin env vars missing.");
    }
  }
  return admin;
};

// Lazy exports to prevent initialization errors during build
export const getAdminAuth = () => {
    const app = initFirebaseAdmin();
    if (!app.apps.length) throw new Error("Firebase Admin not initialized");
    return app.auth();
};

export const getAdminDb = () => {
    const app = initFirebaseAdmin();
    if (!app.apps.length) throw new Error("Firebase Admin not initialized");
    return app.firestore();
};
