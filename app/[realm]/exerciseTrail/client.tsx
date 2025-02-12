'use client';

import { Database } from '@/database.types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getModules, getSubject, getUserCompletedModules } from './server';
import { BehaviorismIcon, GestaltIcon, TSCIcon } from '@/components/svgs/RealmIcons';

// Types
type ModuleType = { id: number; subject_id: number; description: string; level: string };
type CompletedModule = { module_id: number; completed: boolean };
export type Realms = Database['public']['Enums']['realms'];

type ModuleListProps = { subjectId: number; realm: string };
type SubjectInfoProps = { subjectId: number; realm: Realms };

type ModuleItemProps = {
  id: number;
  isUnlocked: boolean;
  subjectId: number;
  realm: string;
  index: number;
};

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className='flex flex-col items-center flex-1 gap-4'>
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className='w-full min-h-fit p-6 rounded-full bg-gray-300 animate-pulse'
      />
    ))}
  </div>
);

// Single Module Item
const ModuleItem = ({ id, isUnlocked, subjectId, realm, index }: ModuleItemProps) => (
  <Link
    data-disable={!isUnlocked || null}
    data-realm={realm}
    data-pos={index % 3}
    href={`/${realm}/exercises?moduleId=${id}&temaId=${subjectId}`}
    className='p-4 rounded-full transition-all duration-200 shadow-cogtec data-disable:pointer-events-none data-disable:cursor-not-allowed data-disable:bg-neutral-400 data-[pos=0]:col-span-2 size-20 aspect-square data-[realm=tsc]:not-data-disable:bg-tsc-100 data-[realm=gestalt]:not-data-disable:bg-gestalt-100 data-[realm=behaviorism]:not-data-disable:bg-behaviorism-100 content-center'
  >
    <div className='mx-auto w-fit'>{!isUnlocked && '🔒'}</div>
  </Link>
);

// Module List
export function ModuleList({ subjectId, realm }: ModuleListProps) {
  const [pending, setPending] = useState(true);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [completedModules, setCompletedModules] = useState<CompletedModule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setModules(await getModules(subjectId));
        setCompletedModules(await getUserCompletedModules(subjectId));
      } catch (error) {
        console.error('Erro ao carregar módulos:', error);
        toast.error('Erro ao carregar módulos.');
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [subjectId]);

  if (pending) return <LoadingSkeleton />;

  return (
    <div className='grid grid-cols-2 flex-1 relative'>
      {modules.length > 0 ? (
        modules.map(({ id }, index) => (
          <ModuleItem
            key={id}
            id={id}
            isUnlocked={
              completedModules.findIndex(({ module_id }) => module_id === id) === index ||
              completedModules.findLastIndex(({ completed }) => completed) + 1 === index
            }
            index={index}
            subjectId={subjectId}
            realm={realm}
          />
        ))
      ) : (
        <p>Nenhum módulo encontrado.</p>
      )}
      <svg
        viewBox='0 0 470 713'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 left-0 right-0 -z-10'
      >
        <path
          d='M240 15H365C485 15 485 184.5 365 184.5H105C-15 184.5 -15 357.5 105 357.5H365C485 357.5 485 528 365 528H105C-15 528 -15 697.5 105 697.5H240'
          stroke='#F0EBD8'
          strokeWidth='30'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
}

// Subject Info
export function SubjectInfo({ subjectId, realm }: SubjectInfoProps) {
  const [pending, setPending] = useState(true);
  const [subject, setSubject] = useState<{ name: string }>({ name: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSubject(await getSubject(subjectId, realm));
      } catch (error) {
        console.error('Erro ao buscar módulos:', error instanceof Error ? error.message : error);
        toast.error('Erro ao buscar módulos.' + (error instanceof Error ? error.message : ''));
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [subjectId, realm]);

  if (pending) return <LoadingSkeleton />;

  const Icon =
    realm === 'tsc' ? TSCIcon : realm === 'gestalt' ? GestaltIcon : realm === 'behaviorism' ? BehaviorismIcon : 'div';

  return (
    <div className='p-4 bg-beige-100 shadow-cogtec flex flex-col gap-4 rounded-4xl max-w-110 h-fit sticky top-8 bottom-8'>
      <div className='flex'>
        <div className='flex flex-col gap-2'>
          <span className='text-logo-200 uppercase font-extrabold text-sm'>teoria sociocultural &gt; história</span>
          <h1 className='text-lg font-bold'>{subject.name}</h1>
        </div>
        <div className='content-center'>
          <Icon className='aspect-square min-h-20' />
        </div>
      </div>
      <p></p>
      <div className='flex justify-end gap-2'>
        <span className='font-semibold'>Orientação</span>
      </div>
    </div>
  );
}
