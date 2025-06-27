import { UserType } from '@prexo/types';

type UserStore = {
    users: UserType[];
    addUser: (user: UserType) => void;
    removeUser: (userId: string) => void;
    setUsers: (users: UserType[]) => void;
  };

type MyProfileStore = {
    myProfile: UserType | null;
    addMyProfile: (user: UserType) => void;
    removeMyProfile: (userId: string) => void;
  };

export type { UserStore, MyProfileStore };