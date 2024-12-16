'use server';

import { createClient } from '@/utils/supabase/server';
import {
  type AuthResponse,
  type AuthTokenResponsePassword,
} from '@supabase/supabase-js';

export async function signInWithPassword(
  formData: FormData
): Promise<AuthTokenResponsePassword> {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  return supabase.auth.signInWithPassword(data);
}

export async function signUpWithPassword(
  formData: FormData
): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  return supabase.auth.signUp(data);
}
