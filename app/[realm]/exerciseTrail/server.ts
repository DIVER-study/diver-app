'use server';

import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/server';

type Realms = Database['public']['Enums']['realms'];

type ModuleType = {
  id: number;
  subject_id: number;
  description: string;
  level: string;
};

export async function getModules(subjectId: number): Promise<ModuleType[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('modules')
    .select('id, subject_id, description, level')
    .eq('subject_id', subjectId)
    .order('id', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getUserCompletedModules(subjectId: number): Promise<{ module_id: number; completed: boolean }[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (user) {
    const { data, error: moduleError } = await supabase
      .from('user_completed_modules')
      .select('module_id, completed')
      .eq('user_id', user.id)
      .eq('subject_id', subjectId);

    if (error) throw moduleError;
    return data || [];
  } else {
    throw error;
  }
}

export async function getSubject(subjectId: number, realm: Realms): Promise<{ name: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('subjects')
    .select('name')
    .eq('id', subjectId)
    .eq('realm', realm)
    .limit(1)
    .single();

  if (error) throw error;
  return data || { name: '' };
}
