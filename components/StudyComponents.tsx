'use client';

import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type SectionType = Database['public']['Enums']['realms'];

type SectionProps = {
  sectionName: string;
  sectionType: SectionType;
};

export type SubjectType = {
  id: number;
  name: string | null;
};

export function StudySection({ sectionName, sectionType }: SectionProps) {
  const [subjects, setSubjects] = useState<SubjectType[]>([...Array(3).fill({})]);
  const [pending, setPending] = useState<boolean>(true);

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
        <h2 className='uppercase text-2xl'>{sectionName}</h2>
      </div>
      <div className='flex gap-8 overflow-x-auto scroll-smooth rounded-xl bg-beige-300 p-4'>
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
      <div className='w-32 aspect-square snap-center space-y-2'>
        <div className='rounded-lg bg-logo-300 w-32 aspect-square animate-pulse' />
        <div className='bg-logo-300 h-4 rounded-lg animate-pulse'></div>
      </div>
    );
  return (
    <Link
      href={`/${sectionType}/exerciseTrail?temaId=${temaId}`}
      className='w-32 aspect-square snap-center space-y-2'
    >
      <div className='rounded-lg bg-logo-300 w-32 aspect-square ' />
      <p className='text-sm uppercase text-center'>{title}</p>
    </Link>
  );
}

export function StudySections() {
  return (
    <>
      <StudySection
        sectionName='Behaviorismo'
        sectionType='behaviorism'
      />
      <StudySection
        sectionName='Gestalt'
        sectionType='gestalt'
      />
      <StudySection
        sectionName='Teoria Sociocultural'
        sectionType='tsc'
      />
    </>
  );
}
