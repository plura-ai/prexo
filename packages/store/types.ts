import { UserType } from '@prexo/types';

type UserStore = {
    users: UserType[];
    addUser: (user: UserType) => void;
    removeUser: (userId: string) => void;
    setUsers: (users: UserType[]) => void;
  };

export type { UserStore };