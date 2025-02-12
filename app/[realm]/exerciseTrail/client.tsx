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
  completed: boolean;
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
const ModuleItem = ({ id, isUnlocked, subjectId, realm, completed }: ModuleItemProps) => (
  <Link
    data-disable={!isUnlocked || null}
    data-completed={completed || null}
    data-realm={realm}
    href={`/${realm}/exercises?moduleId=${id}&temaId=${subjectId}`}
    className='block rounded-full transition-all duration-200 data-disable:pointer-events-none data-disable:cursor-not-allowed data-disable:bg-neutral-400 size-full aspect-square data-[realm=tsc]:not-data-disable:not-data-completed:bg-tsc-100 data-[realm=gestalt]:not-data-disable:not-data-completed:bg-gestalt-100 data-[realm=behaviorism]:not-data-disable:not-data-completed:bg-behaviorism-100 content-center text-xs data-completed:not-data-disable:bg-finished-100'
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

  let pathString = 'M';
  for (let i = 0; i < modules.length; i++) {
    const offsetX = i % 3 === 0 ? 50 : i % 3 === 1 ? 70 : 30;
    const offsetY = (i % 3 === 0 ? Math.floor((i / 3) * 2) : Math.round((i / 3) * 2)) * 40 + 10;
    pathString = pathString.concat(offsetX + ' ' + offsetY);
    if (i % 3 === 0 && i + 1 !== modules.length) {
      pathString =
        pathString +
        ('L' + 70 + ' ' + offsetY + 'C 100 ' + offsetY + ' 100 ' + (Math.round(((i + 1) / 3) * 2) * 40 + 10) + ' ');
    } else if (i % 3 === 2 && i + 1 !== modules.length) {
      pathString =
        pathString +
        ('C 0 ' +
          offsetY +
          ' 0 ' +
          (Math.round(((i + 1) / 3) * 2) * 40 + 10) +
          ' ' +
          30 +
          ' ' +
          (Math.round(((i + 1) / 3) * 2) * 40 + 10) +
          'L');
    } else {
      pathString = pathString + 'L';
    }
  }
  pathString = pathString + 'Z';

  return (
    <svg
      viewBox={`0 0 100 ${40 * Math.floor((modules.length / 3) * 2)}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='flex-1 mx-auto max-w-100'
    >
      <path
        d={pathString}
        stroke='var(--color-beige-300)'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {modules.map(({ id }, index) => {
        const offsetX = index % 3 === 0 ? 50 : index % 3 === 1 ? 70 : 30;
        const offsetY = index % 3 === 0 ? Math.floor((index / 3) * 2) : Math.round((index / 3) * 2);
        return (
          <foreignObject
            x={offsetX - 10}
            y={offsetY * 40}
            width='20'
            height='20'
            key={id}
          >
            <ModuleItem
              id={id}
              subjectId={subjectId}
              realm={realm}
              isUnlocked={
                completedModules.findIndex(({ module_id }) => module_id === id) === index ||
                completedModules.findLastIndex(({ completed }) => completed) + 1 === index
              }
              completed={completedModules.findIndex(({ module_id, completed }) => module_id === id && completed) !== -1}
            />
          </foreignObject>
        );
      })}
    </svg>
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
        toast.error('Erro ao buscar módulos.');
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
    <div className='p-4 bg-beige-100 shadow-cogtec flex flex-col gap-4 rounded-4xl w-full lg:max-w-100 h-fit sticky top-2'>
      <div className='flex justify-between'>
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
