'use client';

import { UserRankingItem } from '@/components/UserRankingItem';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useUserStore, type UserProfile } from '@/stores/userStore';

export default function ClientRankingPage() {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const { user, updateUserProfile } = useUserStore();

  useEffect(() => {
    const prepareData = async () => {
      const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .eq('accepted_ranking', true)
        .order('xp', { ascending: false });
      setProfiles(users || []);
    };
    prepareData();
  });

  return (
    <main className='flex-1 overflow-y-scroll content-center'>
      {user.profile?.accepted_ranking ? (
        <RankingTable profiles={profiles} />
      ) : (
        <div className='text-center'>
          <p className='text-3xl font-semibold'>Participe do Ranking!</p>
          <button
            className='p-2 border-2 border-black'
            onClick={() => updateUserProfile({ accepted_ranking: true })}
          >
            Participe
          </button>
        </div>
      )}
    </main>
  );
}

function RankingTable({ profiles }: { profiles: UserProfile[] }) {
  return (
    <table className='border-collapse my-4 min-w-[400px] [&_th]:p-4 [&_td]:p-4 mx-auto w-full max-w-[600px]'>
      <caption>Ranking</caption>
      <thead>
        <tr className='bg-emerald-600 text-white text-left font-bold'>
          <th
            scope='col'
            className='w-min'
          >
            Posição
          </th>
          <th scope='col'>Usuário</th>
          <th scope='col'>Experiência</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map(({ avatar_url, display_name, xp: progress }, index) => (
          <UserRankingItem
            key={display_name}
            avatarUrl={avatar_url}
            displayName={display_name}
            index={index}
            exp={progress}
          />
        ))}
      </tbody>
    </table>
  );
}
