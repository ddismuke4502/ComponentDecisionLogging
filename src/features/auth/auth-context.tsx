"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFirebaseAuth } from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { isAdminUser } from "@/features/auth/auth-utils";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
  if (!isFirebaseConfigured) {
    return;
  }

  const auth = getFirebaseAuth();

  const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setIsLoading(false);
  });

  return unsubscribe;
}, []);

  const value = useMemo<AuthContextValue>(
  () => ({
    user,
    isLoading,
    isConfigured: isFirebaseConfigured,
    isAdmin: isAdminUser(user),
    signInWithGoogle: async () => {
      if (!isFirebaseConfigured) {
        throw new Error(
          "Firebase is not configured. Add Firebase values to .env.local before signing in.",
        );
      }

      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);
    },
    signOutUser: async () => {
      if (!isFirebaseConfigured) {
        setUser(null);
        return;
      }

      await signOut(getFirebaseAuth());
    },
  }),
  [user, isLoading],
);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}