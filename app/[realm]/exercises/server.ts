'use server';

import { createClient } from '@/utils/supabase/server';

export type ExerciseType = {
  question: string;
  explanation: string;
  options: string[];
  answer: number;
};

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

export const grabExercises = async (moduleId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('exercises')
    .select('question, explanation, options, answer')
    .eq('module_id', moduleId);

  return { data: data as ExerciseType[], error };
};

const getUserPastProgress = async (userId: string, subjectId: number, moduleId: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_completed_modules')
    .select('id, completed')
    .eq('user_id', userId)
    .eq('subject_id', subjectId)
    .eq('module_id', moduleId)
    .limit(1)
    .single();
  return { data, error };
};

export const updateUserProgress = async (
  moduleId: number,
  subjectId: number,
  realm: 'behaviorism' | 'gestalt' | 'tsc'
) => {
  const supabase = await createClient();
  const { id, error: authError } = await getUserId();
  if (!id) return { error: authError };
  const { data } = await getUserPastProgress(id, subjectId, moduleId);
  if (data) {
    return { error: null };
  }
  const { error: insertError } = await supabase.from('user_completed_modules').insert([
    {
      user_id: id,
      module_id: moduleId,
      subject_id: subjectId,
      realm,
      completed: true,
    },
  ]);
  return { error: insertError };
};

export const updateUserXp = async (xpDelta: number) => {
  const supabase = await createClient();
  const { id, error: authError } = await getUserId();
  if (!id) return { error: authError };
  const { data: xpData, error: xpError } = await supabase.from('profiles').select('xp').eq('id', id).limit(1).single();
  if (!xpData) return { error: xpError };
  const { error } = await supabase
    .from('profiles')
    .update({ xp: xpData.xp + xpDelta })
    .eq('id', id);
  return { error };
};
