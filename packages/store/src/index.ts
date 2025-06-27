import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MyProfileStore, UserStore } from "../types";

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

  const useMyProfileStore = create<MyProfileStore>()(
    persist(
      (set) => ({
        myProfile: null,
        addMyProfile: (user) => set({ myProfile: user }),
        removeMyProfile: (id) => set((state) => ({
          myProfile: state.myProfile && state.myProfile.id === id ? null : state.myProfile
        })),
      }),
      {
        name: "@prexo-#myProfile",
      },
    ),
  );

export {useUsersStore, useMyProfileStore};