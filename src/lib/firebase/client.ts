import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";

const firebasePublicEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebasePublicEnv).every(
  Boolean,
);

export function getFirebaseClientApp(): FirebaseApp {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase is not configured. Add Firebase values to .env.local using .env.example as a guide.",
    );
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(getFirebaseConfig());
}

function getFirebaseConfig(): FirebaseOptions {
  return {
    apiKey: firebasePublicEnv.apiKey,
    authDomain: firebasePublicEnv.authDomain,
    projectId: firebasePublicEnv.projectId,
    storageBucket: firebasePublicEnv.storageBucket,
    messagingSenderId: firebasePublicEnv.messagingSenderId,
    appId: firebasePublicEnv.appId,
  };
}