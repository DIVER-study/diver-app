'use client';

import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BehaviorismIcon, GestaltIcon, TSCIcon } from './svgs';

type SectionType = Database['public']['Enums']['realms'];

type SectionProps = {
  sectionName: string;
  sectionType: SectionType;
  motd: string;
};

export type SubjectType = {
  id: number;
  name: string | null;
};

export function StudySection({ sectionName, sectionType, motd }: SectionProps) {
  const [subjects, setSubjects] = useState<SubjectType[]>([...Array(4).fill({})]);
  const [pending, setPending] = useState<boolean>(true);

  const Icon = sectionType === 'behaviorism' ? BehaviorismIcon : sectionType === 'gestalt' ? GestaltIcon : TSCIcon;

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
    <div className='flex gap-4 h-fit flex-col'>
      <div className='inline-flex items-center gap-5'>
        <Icon className='size-25' />
        <h1 className='capitalize text-4xl font-bold text-black'>{sectionName}</h1>
        <p className='text-base text-neutral-600 capitalize'>{motd}</p>
      </div>
      <div className='px-16 py-8 bg-beige-200 rounded-3xl gap-16 h-fit grid grid-flow-col auto-cols-[min-content] overflow-x-auto overscroll-x-contain'>
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
      <div
        className='h-fit w-20 lg:w-30 proto:w-40 grid [grid-template-rows:min-content] items-center gap-3 data-[theme=gestalt]:text-gestalt-100 data-[theme=tsc]:text-tsc-100 data-[theme=behaviorism]:text-behaviorism-100'
        data-theme={sectionType || null}
      >
        <div className='aspect-9/8 w-full shadow-cogtec flex-col justify-end items-center animate-pulse px-6 py-3 rounded-xl gap-2.5 shadow-current bg-beige-50 flex'>
          <div className='self-stretch h-3 bg-current rounded-full' />
        </div>
        <div className='self-stretch text-center text-xl font-bold bg-current rounded-full h-5 animate-pulse'></div>
      </div>
    );
  return (
    <Link
      href={`/${sectionType}/exerciseTrail?temaId=${temaId}`}
      className='h-fit w-20 lg:w-30 proto:w-40 grid [grid-template-rows:min-content] items-center gap-3 data-[theme=gestalt]:text-gestalt-100 data-[theme=tsc]:text-tsc-100 data-[theme=behaviorism]:text-behaviorism-100'
      data-theme={sectionType || null}
    >
      <div className='aspect-9/8 w-full shadow-cogtec flex-col justify-end items-center px-6 py-3 rounded-xl gap-2.5 shadow-current bg-beige-50 flex'>
        <div className='self-stretch h-3 bg-current rounded-full' />
      </div>
      <h3 className='text-center text-black text-xl font-bold'>{title}</h3>
    </Link>
  );
}
