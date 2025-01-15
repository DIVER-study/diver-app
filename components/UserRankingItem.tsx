'use client';

import Image from 'next/image';

type RankingItemProps = {
  avatarUrl: string;
  displayName: string;
  index: number;
  exp: number;
};

export function UserRankingItem({ avatarUrl, displayName, index, exp }: RankingItemProps) {
  return (
    <tr>
      <td>#{index + 1}</td>
      <td className='flex gap-2 items-center'>
        <div className='relative overflow-hidden rounded-full size-8'>
          <Image
            src={avatarUrl || 'empty.jpg'}
            alt=''
            fill
            sizes='100%'
            className='object-cover peer'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.hidden = true;
            }}
          />
          <div className='bg-gray-300 size-full peer-[[hidden=""]]:block hidden' />
        </div>
        {displayName}
      </td>
      <td>{exp}xp</td>
    </tr>
  );
}
