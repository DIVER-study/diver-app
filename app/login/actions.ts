'use server';

import { createClient } from '@/utils/supabase/server';
import { AuthError, AuthResponse, type AuthTokenResponsePassword } from '@supabase/supabase-js';

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
  if (!userData.email.endsWith('@alu.ufc.br')) {
    const response: AuthResponse = {
      data: { user: null, session: null },
      error: new AuthError('Utilize um email institucional da UFC (@alu.ufc.br)'),
    };
    return response;
  }
  const supabase = await createClient();
  return supabase.auth.signUp(userData);
}
