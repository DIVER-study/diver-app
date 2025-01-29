'use client';

import { Database } from '@/database.types';
import { Progress, useUserStore } from '@/stores/userStore';
import { createClient } from '@/utils/supabase/client';
// import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type SectionProps = {
  sectionName: string;
  sectionType: Database['public']['Enums']['realms'];
  progress: Progress;
};

export type SubjectType = {
  created_at: string;
  id: number;
  name: string | null;
  realm: Database['public']['Enums']['realms'];
};

export function StudySection({ sectionName, sectionType, progress }: SectionProps) {
  const finished = progress[sectionType] >= 5;
  const started = progress[sectionType] > 0;
  const [subjects, setSubjects] = useState<SubjectType[]>([]);

  useEffect(() => {
    const gatherSubjects = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('subjects').select('*').eq('realm', sectionType);
      if (data) {
        setSubjects(data);
      } else if (error) {
        toast.error('Houve um erro inesperado.');
      }
    };
    gatherSubjects();
  });

  return (
    <div className='space-y-1 mx-auto max-w-screen-md'>
      <div className='flex flex-row items-center p-1'>
        <div className='flex-1 flex items-center gap-2'>
          <h2 className='uppercase text-2xl'>{sectionName}</h2>
          <p className='text-neutral-600 text-sm'>{progress[sectionType]}/5</p>
        </div>
        <div className='border-2 border-black p-1 rounded-md uppercase text-md'>
          {finished ? 'concluido' : started ? 'em andamento' : 'a fazer'}
        </div>
      </div>
      <div className='grid grid-flow-col auto-cols-[1fr] gap-8 overflow-x-scroll scroll-smooth snap-x rounded-xl border-2 border-black p-4'>
        {subjects.map(({ id, name }, idx) => (
          <ExerciseItem
            key={idx}
            title={name || 'definição'}
            temaId={id}
            sectionType={sectionType}
          />
        ))}
      </div>
    </div>
  );
}

type ExerciseItemProps = { title: string; temaId: string | number; sectionType: Database['public']['Enums']['realms'] };

function ExerciseItem({ title, temaId, sectionType }: ExerciseItemProps) {
  return (
    <Link
      href={`/${sectionType}/exerciseTrail?temaId=${temaId}`}
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
