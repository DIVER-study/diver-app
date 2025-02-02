'use client';

import { FilledStar, ProfileIcon, RankingStar } from '@/components/Svgs';
import { UserState, useUserStore } from '@/stores/userStore';
import Image from 'next/image';

export function ProfileClientPage() {
  const { user } = useUserStore();
  return (
    <div className='bg-white/80 rounded-3xl px-6 pb-8 pt-2 space-y-8 shadow-md max-w-screen-lg mx-auto h-min'>
      <UserProfile profile={user.profile} />
      <UserStatistics />
      <UserAchivments />
    </div>
  );
}

function UserProfile({ profile }: { profile: UserState['user']['profile'] }) {
  return (
    <div className='block text-center text-lg font-semibold space-y-4'>
      <div className='w-40 h-20 flex items-end mx-auto'>
        <div className='rounded-full shadow-md size-40 overflow-hidden shadow-logoorange bg-neutral-300 relative'>
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
            />
          )}
        </div>
      </div>
      <span>{profile?.display_name || 'Usuário'}</span>
    </div>
  );
}

function UserStatistics() {
  return (
    <div className='flex flex-col gap-4 max-w-screen-md mx-auto text-4xl font-semibold'>
      Status
      <div className='flex flex-row gap-4'>
        <div className='p-4 bg-white shadow-[0_4px_4px_2px_rgba(173,173,173,0.25)] rounded-xl flex gap-2 items-center justify-between text-3xl flex-1'>
          <div className='flex gap-2 items-center'>
            <FilledStar className='shrink-0 size-16' />
            100
          </div>
          xp
        </div>
        <div className='p-4 bg-white shadow-[0_4px_4px_2px_rgba(173,173,173,0.25)] rounded-xl flex gap-2 items-center justify-between text-3xl flex-1'>
          <div className='flex gap-2 items-center'>
            <RankingStar className='shrink-0 size-16' />
            Pódio
          </div>
          10
        </div>
      </div>
    </div>
  );
}

function UserAchivments() {
  return (
    <div className='flex flex-col gap-4 max-w-screen-md mx-auto text-4xl font-semibold mb-2'>
      Conquistas
      <div className='grid grid-cols-2 gap-4'>
        {new Array(4).fill('').map((_, idx) => (
          <div
            key={idx}
            className='rounded-xl min-size-40 size-full aspect-square shadow-[0_4px_4px_2px_rgba(173,173,173,0.25)]'
          ></div>
        ))}
      </div>
    </div>
  );
}
