'use client';

import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { PostgrestError, User, UserAttributes, UserResponse } from '@supabase/supabase-js';

export type UserProfile = {
  accepted_ranking: boolean;
  avatar_url: string;
  display_name: string;
  email: string;
  id: string;
  // updated_at: string;
};

export type Progress = {
  behaviorism: number;
  gestalt: number;
  tsc: number;
};

type UserState = {
  user: {
    auth: User | undefined;
    profile: UserProfile | undefined | null;
    progress: Progress;
  };
  setUser: (user: UserState['user']) => void;
  setUserFromDB: () => Promise<void>;
  updateUserProgress: (newData: Partial<Progress>) => Promise<{ error: PostgrestError | null } | { error: Error }>;
  updateRankingChoice: (choice: boolean) => Promise<{ error: PostgrestError | null } | { error: Error }>;
  updateUserSupa: (data: UserAttributes) => Promise<UserResponse>;
};

const emptyProgress = {
  behaviorism: 0,
  gestalt: 0,
  tsc: 0,
};

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    auth: undefined,
    profile: undefined,
    progress: emptyProgress,
  },
  setUser: (user) => set({ user }),
  setUserFromDB: async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).limit(1).single();
      const { data: progress } = await supabase
        .from('user_study_progress')
        .select('behaviorism, gestalt, tsc')
        .eq('id', data.user.id)
        .limit(1)
        .single();

      set({ user: { auth: data.user, profile, progress: progress || emptyProgress } });
    }
  },
  updateUserProgress: async (newData) => {
    const { user } = get();
    const supabase = createClient();
    if (user.auth?.id) {
      const { error } = await supabase.from('user_study_progress').update(newData).eq('id', user.auth.id);
      return { error };
    }
    return { error: new Error('Houve um erro encontrando o usuário.') };
  },
  updateRankingChoice: async (choice) => {
    const { user, setUserFromDB } = get();
    const supabase = createClient();
    if (user.auth?.id) {
      const { error } = await supabase.from('profiles').update({ accepted_ranking: choice }).eq('id', user.auth.id);
      await setUserFromDB();
      return { error };
    }
    return { error: new Error('Houve um erro encontrando o usuário.') };
  },
  updateUserSupa: async (data) => {
    const { setUserFromDB } = get();
    const supabase = createClient();
    const response = await supabase.auth.updateUser(data);
    await setUserFromDB();
    return response;
  },
}));
