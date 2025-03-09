'use client';

import { FilledStar, ProfileIcon, RankingStar } from '@/components/svgs/Svgs';
import { UserState } from '@/stores/userStore';
import Image from 'next/image';
import { useState, useEffect, useTransition } from 'react';
import { getUserRankingPos } from '../server';
import { MdEditSquareIcon } from '@/components/svgs/ExerciseIcons';
import { ChangeNameForm, ChangeProfileImageForm } from './ChangeUserInfoForms';

type ProfileClientPageProps = {
  profile: UserState['user']['profile'];
  editable?: boolean;
};

export function ProfileClientPage({ profile, editable }: ProfileClientPageProps) {
  return (
    <div className='bg-white/80 rounded-3xl px-6 pb-8 pt-2 space-y-8 shadow-cogtec max-w-(--breakpoint-lg) mx-auto h-min'>
      <UserProfile
        profile={profile}
        editable={editable}
      />
      <UserStatistics profile={profile} />
      <UserAchivements />
    </div>
  );
}

function UserProfile({ profile, editable }: { profile: UserState['user']['profile']; editable?: boolean }) {
  return (
    <>
      <div className='block text-center text-lg font-semibold space-y-4'>
        <div className='w-40 h-20 flex items-end mx-auto relative'>
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
                className='object-cover object-center'
              />
            )}
          </div>
          {editable && (
            <button
              className='cursor-pointer absolute bottom-0 right-0'
              popoverTarget='image-form'
              popoverTargetAction='show'
            >
              <MdEditSquareIcon className='size-4' />
            </button>
          )}
        </div>
        <span className='content-center'>
          {profile.display_name}
          {editable && (
            <button
              className='cursor-pointer'
              popoverTarget='name-form'
              popoverTargetAction='show'
            >
              <MdEditSquareIcon className='size-4' />
            </button>
          )}
        </span>
      </div>
      <ChangeNameForm
        oldUsername={profile.display_name}
        id='name-form'
      />
      <ChangeProfileImageForm
        profile={profile}
        id='image-form'
      />
    </>
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
            <FilledStar className='shrink-0 size-16 text-ranking-gold' />
            {profile?.xp || 0}
          </div>
          xp
        </div>
        <div className='p-4 bg-white shadow-cogtec rounded-xl flex gap-2 items-center justify-between text-3xl flex-1'>
          <div className='flex gap-2 items-center'>
            <RankingStar className='shrink-0 size-16 text-ranking-gold' />
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
      <div className='flex px-20 py-15 mx-auto text-center text-lg font-medium'>Sem conquistas ainda :(</div>
    </div>
  );
}
