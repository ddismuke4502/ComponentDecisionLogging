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
import { isAdminUser } from "@/features/auth/auth-utils";
import { getFirebaseAuth } from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/client";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isConfigured: boolean;
  isAdmin: boolean;
  authError: string | null;
  clearAuthError: () => void;
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
  const [authError, setAuthError] = useState<string | null>(null);

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
      authError,
      clearAuthError: () => setAuthError(null),
      signInWithGoogle: async () => {
        setAuthError(null);

        if (!isFirebaseConfigured) {
          setAuthError(
            "Firebase is not configured. Add Firebase values to .env.local before signing in.",
          );
          return;
        }

        try {
          const auth = getFirebaseAuth();
          const provider = new GoogleAuthProvider();

          await signInWithPopup(auth, provider);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Google sign-in failed unexpectedly.";

          setAuthError(message);
        }
      },
      signOutUser: async () => {
        setAuthError(null);

        if (!isFirebaseConfigured) {
          setUser(null);
          return;
        }

        await signOut(getFirebaseAuth());
      },
    }),
    [user, isLoading, authError],
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