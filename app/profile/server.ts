'use server';

import { createClient } from '@/utils/supabase/server';
import { UserAttributes, UserResponse } from '@supabase/supabase-js';

export const updateUserSupa = async (newData: UserAttributes): Promise<UserResponse> => {
  const supabase = await createClient();
  const response = await supabase.auth.updateUser(newData);
  return response;
};

export const updateUserNameSupa = async (newName: string) => {
  const supabase = await createClient();
  const { data } = await supabase.from('profiles').select('display_name').eq('display_name', newName);
  if (data && data?.length > 0) return { error: new Error('Esse nome de usuário não está disponível.') };
  else return await updateUserSupa({ data: { display_name: newName } });
};
