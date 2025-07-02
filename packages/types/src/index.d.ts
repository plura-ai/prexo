type UserType = {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  emailVerified: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  image?: string | null;
};

type ProjectType = {
  id: string;
  name: string;
  description?: string | null;
  domains: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: string;
  memoId?: string | null;
  apiKey?: string | null;
};

export type { UserType, ProjectType };
