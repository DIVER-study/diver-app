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
  const [completedModules, setCompletedModules] = useState<{ module_id: number; subject_id: number }[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          toast.error('Erro ao obter usuário autenticado.');
          return;
        }

        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('id, subject_id, description, level')
          .eq('subject_id', subjectId)
          .order('id', { ascending: true });

        if (modulesError) throw modulesError;

        setModules((modulesData || []) as ModuleType[]);

        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('module_id, subject_id')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        setCompletedModules(progressData || []);
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
          <div key={index} className="inline-flex min-w-fit min-h-fit p-4 rounded-full bg-gray-300 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center flex-1 gap-4">
      {modules.length > 0 ? (
        modules.map((module, index) => {
          const highestCompletedModule = completedModules
            .filter((m) => m.subject_id === subjectId)
            .reduce((max, m) => Math.max(max, m.module_id), 0); // Encontra o maior módulo concluído

          const isUnlocked =
            index === 0 || // O primeiro módulo sempre fica desbloqueado
            module.id <= highestCompletedModule + 1; // Mantém todos os anteriores e o próximo desbloqueados

          return (
            <div key={module.id} className="w-full flex justify-center">
              {isUnlocked ? (
                <Link
                  href={`/${realm}/exercises?moduleId=${module.id}&temaId=${subjectId}`}
                  className="inline-flex items-center justify-center min-w-fit min-h-fit p-4 rounded-full border-4 border-black bg-white hover:bg-neutral-800 hover:text-white transition-all duration-200 shadow-xl text-sm font-medium text-center whitespace-nowrap"
                >
                  {module.description}
                </Link>
              ) : (
                <div className="inline-flex items-center justify-center min-w-fit min-h-fit p-4 rounded-full border-4 border-gray-400 bg-gray-300 text-gray-600 cursor-not-allowed shadow-xl text-sm whitespace-nowrap">
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

        setSubject(data?.[0]?.name || '');
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
      <div className="border-4 border-black rounded-xl w-[25rem] h-[17rem] p-6">
        <div className="h-[1.75rem] mb-4 rounded-lg bg-neutral-500 animate-pulse"></div>
        <div className="mb-4 h-[8rem] rounded-lg bg-neutral-500 animate-pulse"></div>
        <div className="h-[40px] w-full rounded-lg bg-neutral-500 animate-pulse"></div>
      </div>
    );

  return (
    <div className="border-4 border-black rounded-xl w-[25rem] h-[17rem] p-6">
      <h2 className="text-lg font-semibold pb-4">{subject || 'Tema não encontrado.'}</h2>
      <p className="text-xs pb-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis magni libero perspiciatis laudantium illum
        ea cumque porro repellat, quas ducimus beatae recusandae culpa harum nobis vero natus ex sapiente? Soluta?
      </p>

      <div className="flex items-center justify-end">
        <LibraryIconWithoutCircle width={40} height={40} />
        <Link
          href="/library"
          className="text-sm font-medium h-7 pl-2 pr-2 rounded-md border-2 border-b-4 border-r-4 border-black hover:bg-neutral-800 hover:text-white uppercase w-fit"
        >
          EXPLICAÇÃO
        </Link>
      </div>
    </div>
  );
}
