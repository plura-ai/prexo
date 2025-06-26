import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStore } from "../types";

const useUsersStore = create<UserStore>()(
    persist(
      (set) => ({
        users: [],
        addUser: (user) => set((state) => ({ users: [...state.users, user] })),
        removeUser: (userId) => set((state) => ({ users: state.users.filter((u) => u.id !== userId) })),
        setUsers: (users) => set({ users }),
      }),
      {
        name: "@prexo-#users",
      },
    ),
  );

export {useUsersStore};