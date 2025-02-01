'use client';

import { LibraryIconWithoutCircle } from '@/components/Svgs';
import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Types
type ModuleType = {
  description: string;
  id: number;
  subject_id: number;
};
export type Realms = Database['public']['Enums']['realms'];

export function ModuleList({ subjectId, realm }: { subjectId: number; realm: Realms }) {
  const supabase = createClient();

  const [pending, setPending] = useState<boolean>(true);
  const [modules, setModules] = useState<ModuleType[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const { data, error } = await supabase
          .from('modules')
          .select('id, subject_id, description')
          .eq('subject_id', subjectId);
        if (error) throw error;

        setModules(data);
        setPending(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao buscar módulos:', error.message);
          toast.error('Erro ao buscar módulos: ' + error.message);
        } else {
          console.error('Erro desconhecido:', error);
          toast.error('Erro desconhecido');
        }
      }
    };
    init();
  }, [supabase, subjectId]);

  if (pending)
    return (
      <div className='flex flex-col items-center flex-1 gap-4'>
        {new Array(3).fill('').map((_, index) => (
          <div
            key={index}
            className='w-full h-[40px] rounded-xl bg-neutral-500 animate-pulse'
          />
        ))}
      </div>
    );
  return (
    <div className='flex flex-col items-center flex-1 gap-4'>
      {modules.length > 0 ? (
        modules.map(({ id, subject_id, description }) => {
          const linkHref = `/${realm}/exercises?moduleId=${id}&temaId=${subject_id}`;

          return (
            <Link
              href={linkHref}
              className='text-center p-2 rounded-xl border-2 border-black hover:bg-neutral-800 hover:text-white w-full'
              key={id}
            >
              {description}
            </Link>
          );
        })
      ) : (
        <p>Nenhum módulo encontrado.</p>
      )}
    </div>
  );
}

export function SubjectInfo({ subjectId, realm }: { subjectId: number; realm: Realms }) {
  const supabase = createClient();

  const [pending, setPending] = useState<boolean>(true);
  const [subject, setSubject] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      try {
        const { data, error } = await supabase.from('subjects').select('name').eq('id', subjectId).eq('realm', realm);
        if (error) throw error;
        setSubject(data[0].name || '');
        setPending(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao buscar módulos:', error.message);
          toast.error('Erro ao buscar módulos: ' + error.message);
        } else {
          console.error('Erro desconhecido:', error);
          toast.error('Erro desconhecido');
        }
      }
    };

    init();
  }, [subjectId, supabase, realm]);

  if (pending)
    return (
      <div className='border-4 border-black rounded-xl w-[25rem] h-[17rem] p-6'>
        <div className='h-[1.75rem] mb-4 rounded-lg bg-neutral-500 animate-pulse'></div>
        <div className='mb-4 h-[8rem] rounded-lg bg-neutral-500 animate-pulse'></div>
        <div className='h-[40px] w-full rounded-lg bg-neutral-500 animate-pulse'></div>
      </div>
    );
  return (
    <div className='border-4 border-black rounded-xl w-[25rem] h-[17rem] p-6'>
      <h2 className='text-lg font-semibold pb-4'>{subject || 'Tema não encontrado.'}</h2>
      <p className='text-xs pb-8'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis magni libero perspiciatis laudantium illum
        ea cumque porro repellat, quas ducimus beatae recusandae culpa harum nobis vero natus ex sapiente? Soluta?
      </p>

      <div className='flex items-center justify-end'>
        <LibraryIconWithoutCircle
          width={40}
          height={40}
        />
        <Link
          href='/library'
          className='text-sm font-medium h-7 pl-2 pr-2 rounded-md border-2 border-b-4 border-r-4 border-black hover:bg-neutral-800 hover:text-white uppercase w-fit'
        >
          EXPLICAÇÃO
        </Link>
      </div>
    </div>
  );
}
