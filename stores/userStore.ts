'use client';

import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

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
  id: string;
  tsc: number;
  updated_at: string;
};

type UserState = {
  user: {
    auth: User | undefined;
    profile: UserProfile | undefined;
    progress: Progress;
  };
  setUser: (newUser: { auth: User; profile: UserProfile; progress: Progress }) => void;
  setUserFromDB: () => Promise<void>;
};

const emptyProgress = {
  behaviorism: 0,
  gestalt: 0,
  id: '',
  tsc: 0,
  updated_at: '',
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    auth: undefined,
    profile: undefined,
    progress: emptyProgress,
  },
  setUser: (newUser) => set({ user: newUser }),
  setUserFromDB: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: users } = await supabase.from('profiles').select('*').eq('id', user.id);
      const { data: usersProgress } = await supabase.from('user_study_progress').select('*').eq('id', user.id);
      set({ user: { auth: user, profile: users?.at(0), progress: usersProgress?.at(0) || emptyProgress } });
    }
  },
}));
