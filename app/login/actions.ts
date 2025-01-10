'use server';

import { createClient } from '@/utils/supabase/server';
import { type AuthResponse, type AuthTokenResponsePassword } from '@supabase/supabase-js';

// TODO: utilizando um tipo temporário enquanto não temos um UserSchema
export type UserData = {
  email: string;
  password: string;
};

export async function signInWithPassword(userData: UserData): Promise<AuthTokenResponsePassword> {
  const supabase = await createClient();
  return supabase.auth.signInWithPassword(userData);
}

export async function signUpWithPassword(userData: UserData & { options?: object }): Promise<AuthResponse> {
  const supabase = await createClient();
  return supabase.auth.signUp(userData);
}
