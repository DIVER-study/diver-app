import { createClient } from '@/utils/supabase/server';

export const getUserId = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user) {
    return { id: null, error };
  }
  return { id: user.id, error: null };
};

export const getUserDisplayname = async () => {
  const supabase = await createClient();
  const { id } = await getUserId();
  if (!id) return 'usuário';
  const { data } = await supabase.from('profiles').select('display_name').eq('id', id).limit(1).single();
  if (data) return data.display_name;
  return 'usuário';
};
