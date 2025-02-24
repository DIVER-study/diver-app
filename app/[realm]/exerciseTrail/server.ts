'use server';

import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/server';

type Realms = Database['public']['Enums']['realms'];

export type ModuleType = {
  id: number;
  subject_id: number;
};

export type SubjectType = {
  name: string;
  description: string;
  orientation: string;
  slug: string;
};

export async function getModules(subjectId: number): Promise<ModuleType[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('modules')
    .select('id, subject_id')
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

export async function getSubject(subjectId: number, realm: Realms) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('subjects')
    .select('name, description, orientation, slug')
    .eq('id', subjectId)
    .eq('realm', realm)
    .limit(1)
    .single();

  if (error) throw error;
  return data || { name: '', description: '', orientation: '', slug: '' };
}
