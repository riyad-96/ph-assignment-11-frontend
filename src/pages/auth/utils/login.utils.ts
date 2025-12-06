import type { LoginFormFieldTypes } from '@/pages/auth/auth.types';

export async function LoginUser(data: LoginFormFieldTypes) {
  await new Promise((res, rej) => setTimeout(() => res(), 2000));
  return data;
}