'use client';

import { FilledStar, ProfileIcon, RankingStar } from '@/components/svgs/Svgs';
import { UserState } from '@/stores/userStore';
import Image from 'next/image';
import { useState, useEffect, useTransition } from 'react';
import { getUserRankingPos } from '../server';

export function ProfileClientPage({ profile }: { profile: UserState['user']['profile'] }) {
  return (
    <div className='bg-white/80 rounded-3xl px-6 pb-8 pt-2 space-y-8 shadow-cogtec max-w-(--breakpoint-lg) mx-auto h-min'>
      <UserProfile profile={profile} />
      <UserStatistics profile={profile} />
      <UserAchivements />
    </div>
  );
}

function UserProfile({ profile }: { profile: UserState['user']['profile'] }) {
  return (
    <div className='block text-center text-lg font-semibold space-y-4'>
      <div className='w-40 h-20 flex items-end mx-auto'>
        <div className='rounded-full shadow-cogtec size-40 overflow-hidden shadow-logo-200 bg-neutral-300 relative'>
          <ProfileIcon className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' />
          {profile && profile.avatar_url && (
            <Image
              priority
              src={profile.avatar_url}
              fill
              sizes='100%'
              alt=''
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.hidden = true;
              }}
              className='object-cover'
            />
          )}
        </div>
      </div>
      <span>{profile.display_name}</span>
    </div>
  );
}

function UserStatistics({ profile }: { profile: UserState['user']['profile'] }) {
  const [userPosition, setUserPosition] = useState<number>(-1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => setUserPosition(await getUserRankingPos(profile.id)));
  }, [profile]);

  return (
    <div className='flex flex-col gap-4 max-w-(--breakpoint-md) mx-auto text-4xl font-semibold'>
      Status
      <div className='flex flex-row gap-4'>
        <div className='p-4 bg-white shadow-cogtec rounded-xl flex gap-2 items-center justify-between text-3xl flex-1'>
          <div className='flex gap-2 items-center'>
            <FilledStar className='shrink-0 size-16' />
            {profile?.xp || 0}
          </div>
          xp
        </div>
        <div className='p-4 bg-white shadow-cogtec rounded-xl flex gap-2 items-center justify-between text-3xl flex-1'>
          <div className='flex gap-2 items-center'>
            <RankingStar className='shrink-0 size-16' />
            Pódio
          </div>
          {isPending ? '...' : userPosition}
        </div>
      </div>
    </div>
  );
}

function UserAchivements() {
  return (
    <div className='flex flex-col gap-4 max-w-(--breakpoint-md) mx-auto text-4xl font-semibold mb-2'>
      Conquistas
      <div className='grid grid-cols-2 gap-4'>
        {new Array(2).fill('').map((_, idx) => (
          <div
            key={idx}
            className='rounded-xl min-size-40 size-full aspect-square shadow-cogtec bg-white'
          ></div>
        ))}
      </div>
    </div>
  );
}
