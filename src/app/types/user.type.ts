export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string | null;
    bio: string | null;
    gender: string | null;
    occupation: string | null;
    phoneNumber: string;
    profileImage: string;
    isSocialLogin?: boolean;
    role: 'USER' | 'ADMIN';
    image: string;
    isDeleted: boolean;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
  }
  