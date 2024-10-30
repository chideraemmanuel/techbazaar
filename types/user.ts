export type UserAuthType = 'manual' | 'google';
export type UserRole = 'user' | 'admin';

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  role: UserRole;
  disabled: boolean;
}

export interface IGoogleUser extends User {
  auth_type: 'google';
}

export interface IManualUser extends User {
  password: string;
  auth_type: 'manual';
}

export type UserTypes = IGoogleUser | IManualUser;
