'use client';

import { Progress, useUserStore } from '@/stores/userStore';
// import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

type SectionProps = {
  sectionName: string;
  sectionType: 'behaviorism' | 'gestalt' | 'tsc';
  progress: Progress;
};

export function StudySection({ sectionName, sectionType, progress }: SectionProps) {
  const finished = progress[sectionType] >= 5;
  const started = progress[sectionType] > 0;

  return (
    <div className='space-y-1 mx-auto max-w-screen-md'>
      <div className='flex flex-row items-center p-1'>
        <h2 className='flex-1 uppercase text-2xl'>{sectionName}</h2>
        <div className='border-2 border-black p-1 rounded-md uppercase text-md'>
          {finished ? 'concluido' : started ? 'em andamento' : 'a fazer'}
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
      href={`/exercises`}
      className='w-32 aspect-[7/8] snap-center space-y-2'
    >
      <div className='rounded-lg bg-black size-full' />
      <p className='text-sm uppercase text-center'>{title}</p>
    </Link>
  );
}

export function StudySections() {
  // const supabase = createClient();
  const { progress } = useUserStore((state) => state.user);

  return (
    <>
      <StudySection
        sectionName='Behaviorismo'
        sectionType='behaviorism'
        progress={progress}
      />
      <StudySection
        sectionName='Gestalt'
        sectionType='gestalt'
        progress={progress}
      />
      <StudySection
        sectionName='Teoria Sociocultural'
        sectionType='tsc'
        progress={progress}
      />
    </>
  );
}
