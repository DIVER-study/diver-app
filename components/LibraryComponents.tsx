'use client';

// import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

type SectionProps = {
  sectionName: string;
};

export function LibrarySection({ sectionName }: SectionProps) {

  return (
    <div className='space-y-1 mx-auto max-w-screen-md'>
      <div className='flex flex-row items-center p-1'>
        <div className='flex-1 flex items-center gap-2'>
          <h2 className='uppercase text-2xl'>{sectionName}</h2>
        </div>
      </div>
      <div className='grid grid-flow-col auto-cols-[1fr] gap-8 overflow-x-scroll scroll-smooth snap-x rounded-xl border-2 border-black p-4'>
        {new Array(5).fill('').map((_, idx) => (
          <ExerciseItem
            key={idx}
            title='definição'
          />
        ))}
      </div>
    </div>
  );
}

function ExerciseItem({ title }: { title: string }) {
  return (
    <Link
      href={`/material-study`}
      className='w-32 aspect-[7/8] snap-center space-y-2'
    >
      <div className='rounded-lg bg-black size-full' />
      <p className='text-sm uppercase text-center'>{title}</p>
    </Link>
  );
}

export function LibrarySections() {
  return (
    <>
      <LibrarySection
        sectionName='Behaviorismo'
      />
      <LibrarySection
        sectionName='Gestalt'
      />
      <LibrarySection
        sectionName='Teoria Sociocultural'
      />
    </>
  );
}
