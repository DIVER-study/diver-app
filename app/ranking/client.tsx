'use client';

import { UserRankingItem } from '@/components/UserRankingItem';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useUserStore, type UserProfile } from '@/stores/userStore';
import { RankingTrophies } from '@/components/RankingTrophies';

export default function ClientRankingPage() {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const { user, updateRankingChoice } = useUserStore();

  useEffect(() => {
    const prepareData = async () => {
      const { data: users } = await supabase.from('profiles').select('*').eq('accepted_ranking', true);
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
            onClick={() => updateRankingChoice(true)}
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
    <>
    <RankingTrophies />    
    {profiles.map(({ avatar_url, display_name }, index) => (
          <UserRankingItem
            key={display_name}
            avatarUrl={avatar_url}
            displayName={display_name}
            index={index}
            exp={50}
          />
        ))}
    </>

  );
}
