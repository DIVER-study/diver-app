'use client';

import { LibraryIconWithoutCircle } from '@/components/Svgs';
import { Database } from '@/database.types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getModules, getSubject, getUserCompletedModules } from './server';

// Types
type ModuleType = { id: number; subject_id: number; description: string; level: string };
type CompletedModule = { module_id: number; completed: boolean };
export type Realms = Database['public']['Enums']['realms'];

type ModuleListProps = { subjectId: number; realm: string };
type SubjectInfoProps = { subjectId: number; realm: Realms };

type ModuleItemProps = { id: number; description: string; isUnlocked: boolean; subjectId: number; realm: string };

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className='flex flex-col items-center flex-1 gap-4'>
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className='inline-flex min-w-fit min-h-fit p-4 rounded-full bg-gray-300 animate-pulse'
      />
    ))}
  </div>
);

// Single Module Item
const ModuleItem = ({ id, description, isUnlocked, subjectId, realm }: ModuleItemProps) => (
  <Link
    data-disable={!isUnlocked}
    href={`/${realm}/exercises?moduleId=${id}&temaId=${subjectId}`}
    className='flex items-center justify-center p-4 rounded-full border-4 border-black bg-white hover:bg-neutral-800 hover:text-white transition-all duration-200 shadow-xl text-sm font-medium text-center whitespace-nowrap data-[disable=true]:pointer-events-none data-[disable=true]:cursor-not-allowed data-[disable=true]:bg-neutral-700 data-[disable=true]:text-neutral-100'
  >
    {!isUnlocked && '🔒'} {description}
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
    <div className='flex flex-col items-center flex-1 gap-4'>
      {modules.length > 0 ? (
        modules.map(({ id, description }, index) => (
          <ModuleItem
            key={id}
            id={id}
            description={description}
            isUnlocked={
              completedModules.findIndex(({ module_id }) => module_id === id) === index ||
              completedModules.findLastIndex(({ completed }) => completed) + 1 === index
            }
            subjectId={subjectId}
            realm={realm}
          />
        ))
      ) : (
        <p>Nenhum módulo encontrado.</p>
      )}
    </div>
  );
}

// Subject Info
export function SubjectInfo({ subjectId, realm }: SubjectInfoProps) {
  const [pending, setPending] = useState(true);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSubject(await getSubject(subjectId, realm));
      } catch (error) {
        console.error('Erro ao buscar módulos:', error);
        toast.error('Erro ao buscar módulos.');
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [subjectId, realm]);

  if (pending) return <LoadingSkeleton />;

  return (
    <div className='border-4 border-black rounded-xl w-[25rem] h-[17rem] p-6'>
      <h2 className='text-lg font-semibold pb-4'>{subject || 'Tema não encontrado.'}</h2>
      <p className='text-xs pb-8'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis magni libero perspiciatis laudantium.
      </p>
      <div className='flex items-center justify-end'>
        <LibraryIconWithoutCircle
          width={40}
          height={40}
        />
        <Link
          href='/library'
          className='text-sm font-medium h-7 pl-2 pr-2 rounded-md border-2 border-b-4 border-r-4 border-black hover:bg-neutral-800 hover:text-white uppercase'
        >
          EXPLICAÇÃO
        </Link>
      </div>
    </div>
  );
}
