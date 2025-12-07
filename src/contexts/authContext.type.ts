export type User = {
  _id: string;
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  role: 'user' | 'vendor' | 'admin';
  isFraud: boolean;
  created_at: Date;
  updated_at: Date;
};