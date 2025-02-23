'use client';

import Image from 'next/image';
import Link from 'next/link';

type RankingItemProps = {
  avatarUrl: string;
  displayName: string;
  index: number;
  exp: number;
};

export function UserRankingItem({ avatarUrl, displayName, index, exp }: RankingItemProps) {
  return (    
    <>
    <div className='flex justify-center'>
    </div>
    <tr className='bg-white rounded-3xl'>
      <td>
        {/* Nome do usuário */}
        <Link
          href={`/profile/${displayName}`}
          className='flex gap-2 items-center'
        >
          <div className='relative overflow-hidden rounded-full size-8'>
            <div className='absolute top-0 left-0 bg-gray-300 size-full' />
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
                } } />
            )}
          </div>
          {displayName}
        </Link>
      </td>
      <td>{exp}xp</td>
    </tr></>
  );
}