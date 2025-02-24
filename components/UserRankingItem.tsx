'use client';

import Image from 'next/image';
import Link from 'next/link';

type RankingItemProps = {
  avatarUrl: string;
  displayName: string;
  index: number;
  exp: number;
  current: boolean;
};

export function UserRankingItem({ avatarUrl, displayName, index, exp, current }: RankingItemProps) {
  return (
    <Link
      href={`/profile/${displayName}`}
      data-pos={index}
      data-current={current || null}
      className='data-current:z-50 data-current:sticky top-0 bottom-0 data-current:bg-logo-200 data-current:text-white data-[pos=0]:shadow-ranking-gold data-[pos=1]:shadow-ranking-silver data-[pos=2]:shadow-ranking-bronze w-[820px] h-fit px-15 py-2 bg-beige-100 rounded-2xl shadow-cogtec justify-start items-center gap-2.5 flex'
    >
      <div className='flex grow shrink basis-0 justify-start items-center gap-6'>
        <div className='relative w-21.5 h-21.5 overflow-hidden rounded-full bg-logo-100'>
          {avatarUrl !== '' && (
            <Image
              src={avatarUrl}
              alt=''
              fill
              sizes='100%'
              className='object-cover'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.hidden = true;
              }}
            />
          )}
        </div>
        <div className='text-center text-2xl font-bold'>{displayName}</div>
      </div>
      <div className='text-right text-2xl font-bold'>{exp} XP</div>
    </Link>
  );
}
