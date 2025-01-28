'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { SideBar } from '@/components/SideBar';
import { LibraryIconWithoutCircle} from '@/components/Svgs';

// Interfaces
interface Module {
    id: string;
    created_at: string;
    name: string;
    description: string;
    level: string;
    tema_id: number;
}

export default function ExerciseTrailPage() {
    const searchParams = useSearchParams();
    const subjectId = searchParams.get('temaId');
    const supabase = createClient();

    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState<string>('');

    useEffect(() => {
        if (subjectId) {
            const subjectIdNumber = Number(subjectId);
            if (!isNaN(subjectIdNumber)) {
                fetchModules(subjectIdNumber);
                fetchSubject(subjectIdNumber);
            } else {
                console.error('subjectId não é um número válido');
            }
        }
    }, [subjectId]);

    const fetchModules = async (id: number) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('modules')
                .select('*')
                .eq('subject_id', id);
                
            if (error) throw error;
            setModules(data);
        } catch (error: unknown) {
            if (error instanceof Error){
                console.error('Erro ao buscar módulos:', error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchSubject = async (id: number) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('subjects')
                .select('*')
                .eq('id', id);
                
            if (error) throw error;
            setSubject(data[0].name);
        } catch (error: unknown) {
            if (error instanceof Error){
                console.error('Erro ao buscar módulos:', error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='flex h-screen'>
            <SideBar activeTab='estudos' />
        <main className='flex-1 h-full space-y-8 overflow-y-scroll py-8'>
            {loading ? <p>Carregando...</p> : 
                <div className="flex p-[6%] gap-[4.5rem] w-[70rem]">
                    <div className='border-4 border-black rounded-xl w-[25rem] h-[17rem] p-6'>
                        <h2 className='text-lg font-semibold pb-4'>{subject || 'Tema não encontrado.'}</h2>
                        <p className='text-xs pb-8'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis magni libero perspiciatis laudantium illum ea cumque porro repellat, quas ducimus beatae recusandae culpa harum nobis vero natus ex sapiente? Soluta?</p>
                        
                        <div className='flex items-center justify-end'>
                            <LibraryIconWithoutCircle
                                width={40}
                                height={40}
                            />
                            <Link
                                href={`/library`}
                                className="text-sm font-medium relative text-left h-7 pl-2 pr-2 rounded-md border-2 border-b-4 border-r-4 border-black hover:bg-neutral-800 hover:text-white data-[active=true]:bg-black data-[active=true]:text-white uppercase w-fit"
                            >
                                EXPLICAÇÃO 
                            </Link>
                            
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        {modules.length > 0 ? (
                        modules.map((module) => (
                            <div key={module.id} className="w-max mt-8">
                            {/* <h3>{module.name}</h3> */}
                            <Link
                                href={`/exercises?moduleId=${module.id}`}
                                className="relative text-left p-2 rounded-xl border-2 border-black hover:bg-neutral-800 hover:text-white data-[active=true]:bg-black data-[active=true]:text-white uppercase w-fit"
                            >
                                {module.description}
                            </Link>
                            </div>
                        ))
                        ) : (
                        <p>Nenhum módulo encontrado.</p>
                        )}
                    </div>
                </div>              
            }
        </main>
            
        </div>
    );
}
