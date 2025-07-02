"use client";
import { authClient } from "@prexo/auth/client";
import { useMyProfileStore } from "@prexo/store";
import { UserType } from "@prexo/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  user: UserType | null;
  userIP: string | null;
  loading: boolean;
  setUser: (user: UserType | null) => void;
  setUserIP: (userIP: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userIP, setUserIP] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { myProfile, addMyProfile, removeMyProfile } = useMyProfileStore();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const session = await authClient.getSession();
        if (session.data?.user) {
          setUser(session.data.user);
          // If the user is logged in, we check if their profile is already added
          if (myProfile && myProfile.id === session.data.user.id) {
            return;
          }
          // If the user is logged in and their profile is not added, we add it
          addMyProfile(session.data.user);
          console.log("User fetched:", session.data.user);
        } else {
          setUser(null);
          // If the user is not logged in, we remove their profile if it exists
          if (myProfile) {
            removeMyProfile(myProfile.id);
            console.log("User profile removed:", myProfile.id);
          }
          console.log("No user found in session.");
        }

        if (session.data?.session) {
          setUserIP(session.data.session.ipAddress!);
          console.log("User IP fetched:", session.data.session.ipAddress);
        } else {
          setUserIP(null);
          console.log("No user IP found in session.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [addMyProfile, myProfile, removeMyProfile]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, userIP, setUserIP }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the user context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
