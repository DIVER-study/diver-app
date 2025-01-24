'use client';

import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { PostgrestError, User } from '@supabase/supabase-js';

export type UserProfile = {
  accepted_ranking: boolean;
  avatar_url: string;
  display_name: string;
  email: string;
  id: string;
  updated_at: string;
};

export type Progress = {
  behaviorism: number;
  gestalt: number;
  tsc: number;
};

type UserState = {
  user: {
    auth: User | undefined;
    profile: UserProfile | undefined;
    progress: Progress;
  };
  setUser: (newUser: { auth: User; profile: UserProfile; progress: Progress }) => void;
  setUserFromDB: () => Promise<void>;
  updateUserProgress: (newData: Partial<Progress>) => Promise<{ error: PostgrestError | null }>;
};

const emptyProgress = {
  behaviorism: 0,
  gestalt: 0,
  id: '',
  tsc: 0,
  updated_at: '',
};

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    auth: undefined,
    profile: undefined,
    progress: emptyProgress,
  },
  setUser: (newUser) => set({ user: newUser }),
  setUserFromDB: async () => {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const { data: users } = await supabase.from('profiles').select('*').eq('id', user.user!.id);
    const { data: usersProgress } = await supabase.from('user_study_progress').select('*').eq('id', user.user!.id);
    set({ user: { auth: user.user!, profile: users?.at(0), progress: usersProgress?.at(0) || emptyProgress } });
  },
  updateUserProgress: async (newData) => {
    const { user } = get()
    const supabase = createClient();
    const {error} = await supabase.from('user_study_progress').update(newData).eq('id', user.auth!.id);
    if (error) return { error };
    else return { error: null};
  }
}));
