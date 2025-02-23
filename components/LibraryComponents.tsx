'use client';

import Link from 'next/link';
import { Button } from './ui/Button';
import { cn } from '@/utils/cnUtil';
import { BehaviorismIcon, GestaltIcon, TSCIcon } from './svgs';

type LibraryCardProps = {
  category: string;
  behaviorismSlug: string;
  gestaltSlug: string;
  tscSlug: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const LibraryCard = ({
  className,
  behaviorismSlug,
  gestaltSlug,
  tscSlug,
  category,
  ...props
}: LibraryCardProps) => {
  const getLinkSlug = (slug: string) => slug.replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('í', 'i');
  const getTextSlug = (slug: string) => slug.replaceAll('-', ' ');
  return (
    <div
      className={cn(
        'flex flex-col gap-8 rounded-3xl bg-beige-50 shadow-cogtec px-8 py-4 data-selected:shadow-logo-200',
        className
      )}
      {...props}
    >
      <h2 className='text-xl font-bold capitalize'>{category}</h2>
      <Button
        variant='outline'
        theme='behaviorism'
        className='justify-start border-4 font-semibold capitalize'
        asChild
      >
        <Link href={`/library/${getLinkSlug(behaviorismSlug)}`}>
          <BehaviorismIcon />
          <span>{getTextSlug(behaviorismSlug)}</span>
        </Link>
      </Button>
      <Button
        variant='outline'
        theme='gestalt'
        className='justify-start border-4 font-semibold capitalize'
        asChild
      >
        <Link href={`/library/${getLinkSlug(gestaltSlug)}`}>
          <GestaltIcon />
          <span>{getTextSlug(gestaltSlug)}</span>
        </Link>
      </Button>
      <Button
        variant='outline'
        theme='tsc'
        className='justify-start border-4 font-semibold capitalize'
        asChild
      >
        <Link href={`/library/${getLinkSlug(tscSlug)}`}>
          <TSCIcon />
          <span>{getTextSlug(tscSlug)}</span>
        </Link>
      </Button>
    </div>
  );
};

export const LocalNav = () => <div className='flex gap-4'>Link</div>;
