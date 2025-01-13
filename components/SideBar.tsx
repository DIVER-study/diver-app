'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { CogTecLogo } from './Svgs';

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
    perfil: 'settings',
    biblioteca: 'library',
    home: '/',
    reinos: 'realms',
    ranking: 'ranking',
  };

  return (
    <>
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
      <aside className='navbar sticky top-0 left-0 flex flex-col w-64 h-screen p-4 gap-8 group bg-blue-600 text-white'>
        <div>
          {/* <h1 className='text-3xl font-bold mb-4' hidden>Cog Tec</h1> */}
          <CogTecLogo />
        </div>
        <nav className='flex-1 flex flex-col gap-4'>
          {['home', 'reinos', 'biblioteca', 'ranking', 'perfil'].map((tab) => (
            <Link
              href={'/' + tabRoutes[tab]}
              className='w-full text-left p-2 rounded-lg hover:bg-blue-500 data-[active=true]:bg-blue-700'
              data-active={activeTab === tab}
              key={tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Link>
          ))}
        </nav>
        <button
          className='bg-red-500 hover:bg-red-400 p-2 text-white rounded-lg'
          popoverTarget='signout-popup'
          popoverTargetAction='show'
        >
          Sair
        </button>
      </aside>
    </>
  );
}
