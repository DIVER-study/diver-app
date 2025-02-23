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
  xp: number;
};

export type Progress = {
  behaviorism: number;
  gestalt: number;
  tsc: number;
};

export type UserState = {
  user: {
    auth: User | null;
    profile: UserProfile;
  };
  setUser: (user: UserState['user']) => void;
  setUserFromDB: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<{ error: PostgrestError | null } | { error: Error }>;
  updateUserSupa: (data: UserAttributes) => Promise<UserResponse>;
};

const emptyProfile = {
  accepted_ranking: false,
  avatar_url: '/empty-user.png',
  display_name: 'user',
  email: 'empty@null.com',
  id: '00000000-0000-0000-0000-000000000000',
  xp: 0,
};

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    auth: null,
    profile: emptyProfile,
  },
  setUser: (user) => set({ user }),
  setUserFromDB: async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).limit(1).single();

      set({ user: { auth: data.user, profile: profile || emptyProfile } });
    }
  },
  updateUserProfile: async (data) => {
    const { user, setUserFromDB } = get();
    const supabase = createClient();
    if (user.auth?.id) {
      const { error } = await supabase.from('profiles').update(data).eq('id', user.auth.id);
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
