'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { CogTecLogo, ExitIcon, LibrarySideIcon, ProfileIcon, RankingIcon, StudyIcon } from './svgs/Svgs';
import { useRef } from 'react';
import { useUserStore } from '@/stores/userStore';

export function SideBar({ activeTab }: { activeTab?: 'estudos' | 'biblioteca' | 'ranking' | 'perfil' }) {
  const signOutPopup = useRef<HTMLDivElement>(null);
  const { profile } = useUserStore((state) => state.user);

  const signOut = async () => {
    signOutPopup.current?.hidePopover();

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(`Erro: ${error.message}`);
    } else {
      toast.success('Sucesso!');
      redirect('/login');
    }
  };

  const tabRoutes: {
    [key: string]: { href: string; icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element };
  } = {
    perfil: { href: `/profile/${profile?.display_name || ''}`, icon: ProfileIcon },
    biblioteca: { href: '/library', icon: LibrarySideIcon },
    estudos: { href: '/', icon: StudyIcon },
    ranking: { href: '/ranking', icon: RankingIcon },
  };

  return (
    <>
      {/* Popup de signout */}
      <div
        popover='auto'
        id='signout-popup'
        ref={signOutPopup}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 hidden grid-cols-2 gap-4 [&:popover-open]:grid ring-1 ring-neutral-500 rounded-lg'
      >
        <div className='col-span-2'>Você tem Certeza?? :(</div>
        <button
          className='bg-warning hover:bg-warning/80'
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
      <aside className='min-w-75 min-h-screen py-10 bg-logo-100 rounded-r-3xl flex-col justify-between flex sticky top-0 left-0'>
        <div className='justify-center items-center gap-8 inline-flex h-15 text-logo-200'>
          <CogTecLogo
            height={61}
            width={64}
          />
          <span className='h-13 text-[40px] font-extrabold'>CogTec</span>
        </div>
        <nav className='grow flex-col justify-center items-start flex gap-2.5'>
          {['estudos', 'biblioteca', 'ranking', 'perfil'].map((tab) => {
            const { href, icon: Icon } = tabRoutes[tab];
            return (
              <Link
                href={href}
                className='pl-17.5 py-6 hover:bg-logo-200 data-active:bg-logo-200 rounded-r-3xl items-center gap-4 inline-flex hover:text-white data-active:text-white text-2xl font-bold text-black'
                data-active={activeTab === tab || null}
                key={tab}
              >
                <Icon className='size-12' />
                {tab}
              </Link>
            );
          })}
        </nav>
        <button
          className='h-8 px-8 justify-start items-center gap-4 inline-flex text-warning text-xl font-medium'
          popoverTarget='signout-popup'
          popoverTargetAction='show'
        >
          <ExitIcon className='pointer-events-none shrink-0 size-8' />
          Sair
        </button>
      </aside>
    </>
  );
}
