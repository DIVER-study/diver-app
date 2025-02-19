'use client';

import { Database } from '@/database.types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getModules, getSubject, getUserCompletedModules } from './server';
import { BehaviorismIcon, GestaltIcon, TSCIcon } from '@/components/svgs';
import IdeaIcon from '@/components/svgs/IdeiaIcon';
import { IntroTema } from '@/components/ui/alert-boxes/IntroTema';
import { redirect } from 'next/navigation';

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
  <button
    disabled={!isUnlocked}
    data-completed={completed || null}
    data-realm={realm}
    onClick={() => redirect(`/${realm}/exercises?moduleId=${id}&temaId=${subjectId}`)}
    className='block exercise-realm w-full aspect-square data-completed:bg-finished-100'
  ></button>
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
        console.error('Erro ao carregar módulos:', error instanceof Error ? error.message : error);
        toast.error('Erro ao carregar módulos.');
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [subjectId]);

  if (pending) return <LoadingSkeleton />;

  const getPathString = (array: Array<unknown>) => {
    let pathString = 'M';
    for (let i = 0; i < array.length; i++) {
      const cx = i % 3 === 0 ? 50 : i % 3 === 1 ? 70 : 30;
      const cy = Math.round((i / 3) * 2) * 40 + 10;
      const j = i + 1;
      const ny = Math.round((j / 3) * 2) * 40 + 10;

      pathString += cx + ' ' + cy;
      if (j === array.length) {
        break;
      } else if (i % 3 === 0) {
        pathString += 'L' + 70 + ' ' + cy + 'C 100 ' + cy + ' 100 ' + ny + ' ';
      } else if (i % 3 === 2) {
        pathString += 'C 0 ' + cy + ' 0 ' + ny + ' ' + 30 + ' ' + ny + 'L';
      } else {
        pathString += 'L';
      }
    }
    return pathString;
  };

  return (
    <svg
      viewBox={`0 0 100 ${40 * Math.ceil((modules.length / 3) * 2)}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='flex-1 mx-auto'
    >
      <path
        d={getPathString(modules)}
        stroke='var(--color-beige-200)'
        strokeWidth='7'
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
            height='24'
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
  const realmName = realm === 'tsc' ? 'teoria sociocultural' : realm === 'gestalt' ? 'gestalt' : 'behaviorismo';

  return (
    <div className='px-6 py-7 bg-white rounded-4xl shadow-cogtec flex-col flex gap-6 max-w-130 h-fit'>
      <div className='self-stretch justify-between items-center flex'>
        <div className='grow shrink basis-0 flex-col gap-4 flex'>
          <span className='self-stretch text-logo-200 text-base font-bold uppercase'>
            {realmName} &gt; {subject.name}
          </span>
          <h1 className='self-stretch text-4xl font-bold'>{subject.name}</h1>
        </div>
        <Icon className='size-25' />
      </div>
      <p className='self-strecth text-xl font-medium'>Descrição do tema inserir aqui!</p>
      <div className='self-stretch justify-end items-center gap-3 flex'>
        <span className='font-bold text-xl'>Orientação</span>
        <button
          popoverTarget='intro-tema'
          popoverTargetAction='show'
          className='cursor-pointer size-14'
        >
          <IdeaIcon />
        </button>
        <IntroTema
          title={subject.name}
          desc='Descrição avançada do tema inserir aqui!'
          id='intro-tema'
        />
      </div>
    </div>
  );
}
