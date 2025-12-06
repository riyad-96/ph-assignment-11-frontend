import type { RegisterFormFieldTypes } from '@/pages/auth/auth.types';

export async function createAccount(data: RegisterFormFieldTypes) {
  await new Promise((res, rej) => setTimeout(() => res(), 2000));
  return data;
}
