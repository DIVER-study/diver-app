'use server';

import { createClient } from '@/utils/supabase/server';
import { type AuthResponse, type AuthTokenResponsePassword } from '@supabase/supabase-js';

// TODO: utilizando um tipo temporário enquanto não temos um UserSchema
export type UserData = {
  email: string;
  password: string;
  display_name: string;
  avatar_url: string;
};

export async function signInWithPassword(formData: FormData): Promise<AuthTokenResponsePassword> {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  return supabase.auth.signInWithPassword(data);
}

export async function signUpWithPassword(userData: UserData): Promise<AuthResponse> {
  const supabase = await createClient();

  return supabase.auth.signUp(userData);
}
