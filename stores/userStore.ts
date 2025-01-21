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

type UserState = {
  user: {
    auth: User | undefined;
    profile: UserProfile | undefined;
  } | null;
  setUser: (newUser: { auth: User; profile: UserProfile }) => void;
  setUserFromDB: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  setUserFromDB: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: users } = await supabase.from('profiles').select('*').eq('id', user?.id);
      set({ user: { auth: user, profile: users?.at(0) } });
    }
  },
}));
