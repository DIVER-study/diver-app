'use client';

import { UserRankingItem } from '@/components/UserRankingItem';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type UserProfile = {
  accepted_ranking: boolean;
  avatar_url: string;
  display_name: string;
  email: string;
  id: string;
  updated_at: string;
};

export default function ClientRankingPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);
  const [usersProfiles, setUsersProfiles] = useState<UserProfile[] | null>([]);

  useEffect(() => {
    const prepareData = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUserId(currentUser?.id);
      const { data: users } = await supabase.from('profiles').select('*');
      setUsersProfiles(users);
      setUserProfile(users?.filter(({ id }) => id === userId)[0]);
    };
    prepareData();
  });
  const updateUserProfile = async (data: object, userId: string) => {
    const { error } = await supabase.from('profiles').update(data).eq('id', userId);
    if (error) console.error(`Erro: ${error.message}`);
  };
  return (
    <main className='flex-1 overflow-y-scroll content-center'>
      {userProfile?.accepted_ranking ? (
        <table className='border-collapse my-4 min-w-[400px] [&_th]:p-4 [&_td]:p-4 mx-auto w-full max-w-[600px]'>
          <caption>Ranking</caption>
          <thead>
            <tr className='bg-emerald-600 text-white text-left font-bold'>
              <th scope='col'>Posição</th>
              <th scope='col'>Usuário</th>
              <th scope='col'>Experiência</th>
            </tr>
          </thead>
          <tbody>
            {usersProfiles?.map(({ avatar_url, display_name }, index) => (
              <UserRankingItem
                key={display_name}
                avatarUrl={avatar_url}
                displayName={display_name}
                index={index}
                exp={50}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className='flex flex-col gap-2 text-center'>
          <p className='text-3xl font-semibold'>Participe do Ranking!</p>
          <button
            className='p-2 border-2 border-black'
            onClick={() => updateUserProfile({ accepted_ranking: true }, userId!)}
          >
            Participe
          </button>
        </div>
      )}
    </main>
  );
}
