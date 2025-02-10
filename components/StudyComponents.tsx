'use client';

import { Database } from '@/database.types';
import { useUserStore } from '@/stores/userStore';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type SectionType = Database['public']['Enums']['realms'];

type SectionProps = {
  sectionName: string;
  sectionType: SectionType;
  progress: number;
};

export type SubjectType = {
  id: number;
  name: string | null;
};

export function StudySection({ sectionName, sectionType, progress }: SectionProps) {
  const [subjects, setSubjects] = useState<SubjectType[]>([{ id: -1, name: '' }]);
  const [pending, setPending] = useState<boolean>(true);
  const started = progress > 0;
  const finished = progress >= subjects.length;

  useEffect(() => {
    const supabase = createClient();
    const grabData = async () => {
      const { data, error } = await supabase.from('subjects').select('*').eq('realm', sectionType);
      if (data) {
        setSubjects(data);
        setPending(false);
      } else if (error) {
        toast.error('Houve um erro inesperado.');
      }
    };
    grabData();
  }, [sectionType]);

  return (
    <div className='space-y-1 mx-auto max-w-(--breakpoint-md)'>
      <div className='flex flex-row items-center p-1'>
        <div className='flex-1 flex items-center gap-2'>
          <h2 className='uppercase text-2xl'>{sectionName}</h2>
          <p className='text-neutral-600 text-sm'>
            {progress}/{subjects.length}
          </p>
        </div>
        <div className='border-2 border-black p-1 rounded-md uppercase text-md'>
          {pending ? 'carregando...' : finished ? 'concluido' : started ? 'em andamento' : 'a fazer'}
        </div>
      </div>
      <div className='grid grid-flow-col auto-cols-[1fr] gap-8 overflow-x-auto scroll-smooth snap-x rounded-xl border-2 border-black p-4'>
        {subjects.map(({ id, name }, idx) => (
          <ExerciseItem
            key={idx}
            title={name || 'definição'}
            temaId={id}
            sectionType={sectionType}
            skeleton={pending}
          />
        ))}
      </div>
    </div>
  );
}

type ExerciseItemProps = {
  title: string;
  temaId: string | number;
  sectionType: SectionType;
  skeleton: boolean;
};

function ExerciseItem({ title, temaId, sectionType, skeleton }: ExerciseItemProps) {
  if (skeleton)
    return (
      <div className='w-32 aspect-7/8 snap-center space-y-2'>
        <div className='rounded-lg bg-neutral-500 size-full animate-pulse' />
        <div className='bg-neutral-500 h-4 rounded-lg animate-pulse'></div>
      </div>
    );
  return (
    <Link
      href={`/${sectionType}/exerciseTrail?temaId=${temaId}`}
      className='w-32 aspect-7/8 snap-center space-y-2'
    >
      <div className='rounded-lg bg-black size-full' />
      <p className='text-sm uppercase text-center'>{title}</p>
    </Link>
  );
}

export function StudySections() {
  const { progress } = useUserStore((state) => state.user);

  return (
    <>
      <StudySection
        sectionName='Behaviorismo'
        sectionType='behaviorism'
        progress={progress['behaviorism']}
      />
      <StudySection
        sectionName='Gestalt'
        sectionType='gestalt'
        progress={progress['gestalt']}
      />
      <StudySection
        sectionName='Teoria Sociocultural'
        sectionType='tsc'
        progress={progress['tsc']}
      />
    </>
  );
}
