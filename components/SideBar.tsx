'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowIndicator, CogTecLogo, ExitIcon } from './Svgs';

export function SideBar({ activeTab = 'home' }: { activeTab?: string }) {
  const signOut = async () => {
    const popup = document.getElementById('signout-popup');
    popup?.hidePopover();

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(`Erro: ${error.message}`);
    } else {
      toast.success('Sucesso!');
      redirect('/login');
    }
  };

  const tabRoutes: { [key: string]: string } = {
    perfil: '/settings',
    biblioteca: '/library',
    estudos: '/',
    ranking: '/ranking',
  };

  return (
    <>
      {/* Popup de signout */}
      <div
        popover='auto'
        id='signout-popup'
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 hidden grid-cols-2 gap-4 [&:popover-open]:grid ring-1 ring-neutral-500 rounded-lg'
      >
        <div className='col-span-2'>Você tem Certeza?? :(</div>
        <button
          className='bg-red-500 hover:bg-red-500/80'
          onClick={signOut}
        >
          Sim
        </button>
        <button
          className='ring-1 ring-neutral-500 hover:bg-neutral-500/80 hover:ring-neutral-500/80'
          popoverTarget='signout-popup'
          popoverTargetAction='hide'
        >
          Não
        </button>
      </div>
      {/* Side Bar */}
      <aside className='sticky top-0 left-0 flex flex-col w-64 h-screen p-4 gap-8 group text-black [&_+_*]:rounded-l-[2rem] [&_+_*]:border-2 [&_+_*]:border-black'>
        <div className='bg-black p-4 rounded-[1.5rem]'>
          <CogTecLogo
            height={40}
            className='fill-white'
          />
        </div>
        <nav className='flex-1 flex flex-col gap-4'>
          {['estudos', 'biblioteca', 'ranking', 'perfil'].map((tab) => (
            <Link
              href={tabRoutes[tab]}
              className='relative w-full text-left p-2 rounded-xl border-2 border-black hover:bg-neutral-800 hover:text-white data-[active=true]:bg-black data-[active=true]:text-white uppercase'
              data-active={activeTab === tab}
              key={tab}
            >
              {tab}
              {activeTab === tab && (
                <ArrowIndicator className='absolute right-[-20%] top-1/2 size-10 -translate-y-1/2' />
              )}
              {/* <div className='rounded-full bg-black absolute right-[-8%] top-1/2 size-2 -translate-y-1/2' /> */}
            </Link>
          ))}
        </nav>
        <button
          className='hover:bg-neutral-800 hover:text-white p-2 text-black rounded-lg uppercase flex gap-2 items-center'
          popoverTarget='signout-popup'
          popoverTargetAction='show'
        >
          <ExitIcon className='pointer-events-none shrink-0 size-4' />
          Sair
        </button>
      </aside>
    </>
  );
}
