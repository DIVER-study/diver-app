'use client';

// import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { Button } from './ui/Button';
import { cn } from '@/utils/cnUtil';

export const LibraryCard = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('flex flex-col gap-8 rounded-3xl bg-beige-50 shadow-cogtec', className)}
      {...props}
    >
      <h2 className='text-2xl font-bold'></h2>
      <Button
        className='bg-behaviorism-100 border-behaviorism-100'
        asChild
      >
        <Link href='#'></Link>
      </Button>
      <Button
        className='bg-gestalt-100 border-gestalt-100'
        asChild
      >
        <Link href='#'></Link>
      </Button>
      <Button
        className='bg-tsc-100 border-tsc-100'
        asChild
      >
        <Link href='#'></Link>
      </Button>
    </div>
  );
};

export const LocalNav = () => <div className='flex gap-4'>Link</div>;
