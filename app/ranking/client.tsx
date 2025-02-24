'use client';

import { UserRankingItem } from '@/components/UserRankingItem';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useUserStore, type UserProfile } from '@/stores/userStore';
import { RankingTrophies } from '@/components/RankingTrophies';
import { Button } from '@/components/ui/Button';
import { GoldTrophy, Shine, WelcomeBanner } from '@/components/svgs/Svgs';

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
    <main className='flex-1 overflow-y-scroll'>
      {user.profile?.accepted_ranking ? (
        <RankingTable
          profiles={profiles}
          currentUser={user.profile.display_name}
        />
      ) : (
        <div className='text-center flex flex-col gap-12 justify-center items-center h-full'>
          <WelcomeBanner />
          <div className='flex justify-center items-center'>
            <div className='flex justify-end flex-col h-full'>
              <Shine />
            </div>
            <GoldTrophy className='size-60' />
            <div className='flex flex-col h-full'>
              <Shine />
            </div>
          </div>
          <p className='text-xl text-[#A87400] py-8 px-16 rounded-3xl bg-ranking-gold font-semibold'>
            Participe e desafie seus amigos &gt;:)
          </p>
          <Button
            className=''
            onClick={() => updateUserProfile({ accepted_ranking: true })}
          >
            Participe
          </Button>
        </div>
      )}
    </main>
  );
}

function RankingTable({ profiles, currentUser }: { profiles: UserProfile[]; currentUser: string }) {
  return (
    <>
      <RankingTrophies />
      <div className='flex flex-col gap-4 mx-auto items-center'>
        {profiles.map(({ avatar_url, display_name, xp }, index) => (
          <UserRankingItem
            key={index}
            avatarUrl={avatar_url}
            displayName={display_name}
            index={index}
            exp={xp}
            current={display_name === currentUser}
          />
        ))}
      </div>
    </>
  );
}
