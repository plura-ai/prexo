export type UserType = {
    id: string;
    name: string;
    email: string;
    role?: string | null;
    emailVerified: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
    image?: string | null;
  };