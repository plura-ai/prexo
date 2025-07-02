"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useUsersStore } from "@prexo/store";

interface StoreContextType {
  contentLoading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [contentLoading, setContentLoading] = useState(false);

  const { users, setUsers } = useUsersStore();

  const USER_API_ENDPOINT =
    process.env.NODE_ENV == "development"
      ? "http://localhost:3001/v1/user/public"
      : "https://api.indexflow.site/v1/user/public";

  useEffect(() => {
    async function fetchUsers() {
      setContentLoading(true);
      const data = await fetch(USER_API_ENDPOINT);
      const response = await data.json();
      if (response?.users) {
        setUsers(response.users);
      }
      setContentLoading(false);
    }

    if (users.length === 0) {
      fetchUsers();
    }
  }, [users.length, setUsers, USER_API_ENDPOINT]);

  const value = {
    contentLoading,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
