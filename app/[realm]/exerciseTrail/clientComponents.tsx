'use client';

import { LibraryIconWithoutCircle } from '@/components/Svgs';
import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Tipos de módulo
type ModuleType = {
  id: number;
  subject_id: number;
  description: string;
  level: 'easy' | 'medium' | 'difficult';
};

export type Realms = Database['public']['Enums']['realms'];

export function ModuleList({ subjectId, realm }: { subjectId: number; realm: string }) {
  const supabase = createClient();

  const [pending, setPending] = useState<boolean>(true);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [completedModules, setCompletedModules] = useState<number[]>([]); // Módulos concluídos pelo usuário

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // 🔹 Obtendo o ID do usuário autenticado
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          toast.error('Erro ao obter usuário autenticado.');
          return;
        }

        // Obtendo os módulos e ordenando pelo ID
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('id, subject_id, description, level')
          .eq('subject_id', subjectId)
          .order('id', { ascending: true });

        if (modulesError) throw modulesError;

        setModules(modulesData || []);

        // Obtendo os módulos que o usuário concluiu
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('module_id')
          .eq('user_id', user.id); // ✅ Agora usando o ID correto

        if (progressError) throw progressError;

        setCompletedModules(progressData?.map((p) => p.module_id) || []);
        setPending(false);
      } catch (error) {
        console.error('Erro ao carregar módulos:', error);
        toast.error('Erro ao carregar módulos.');
        setPending(false);
      }
    };

    fetchModules();
  }, [subjectId, supabase]);

  if (pending) {
    return (
      <div className="flex flex-col items-center flex-1 gap-4">
        {new Array(3).fill('').map((_, index) => (
          <div key={index} className="w-full h-[40px] rounded-xl bg-neutral-500 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center flex-1 gap-4">
      {modules.length > 0 ? (
        modules.map((module, index) => {
          const previousModuleId = index > 0 ? modules[index - 1].id : null;
          const isUnlocked = index === 0 || (previousModuleId !== null && completedModules.includes(previousModuleId));

          return (
            <div key={module.id} className="w-full">
              {isUnlocked ? (
                <Link
                  href={`/${realm}/exercises?moduleId=${module.id}&temaId=${subjectId}`}
                  className="text-center p-2 rounded-xl border-2 border-black hover:bg-neutral-800 hover:text-white w-full"
                >
                  {module.description}
                </Link>
              ) : (
                <div className="text-center p-2 rounded-xl border-2 border-gray-400 bg-gray-300 text-gray-600 cursor-not-allowed w-full">
                  🔒 {module.description}
                </div>
              )}
            </div>
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
        const { data, error } = await supabase
          .from('subjects')
          .select('name')
          .eq('id', subjectId)
          .eq('realm', realm);

        if (error) throw error;

        setSubject(data?.[0]?.name || ''); // 🔹 Proteção contra valores indefinidos
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
        <LibraryIconWithoutCircle width={40} height={40} />
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
