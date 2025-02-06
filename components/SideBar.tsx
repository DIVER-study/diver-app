'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { CogTecLogo, ExitIcon, LibrarySideIcon, ProfileIcon, RankingIcon, StudyIcon } from './Svgs';
import { useRef } from 'react';
import { useUserStore } from '@/stores/userStore';

export function SideBar({ activeTab }: { activeTab?: 'estudos' | 'biblioteca' | 'ranking' | 'perfil' }) {
  const signOutPopup = useRef<HTMLDivElement>(null);
  const { profile } = useUserStore((state) => state.user);

  const signOut = async () => {
    // const popup = document.getElementById('signout-popup');
    // popup?.hidePopover();
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
      <aside className='sticky top-0 left-0 flex flex-col py-4 w-48 h-screen gap-8 text-black bg-bgbeige rounded-r-[2rem] drop-shadow-md'>
        <div className='flex justify-start gap-4 items-center p-4'>
          <CogTecLogo
            height={40}
            className='fill-logoorange'
          />
          <span className='italic font-new-zen font-bold text-3xl text-logoorange'>CogTec</span>
        </div>
        <nav className='flex-1 flex flex-col gap-4 justify-center items-center font-semibold capitalize'>
          {['estudos', 'biblioteca', 'ranking', 'perfil'].map((tab) => {
            const { href, icon: Icon } = tabRoutes[tab];
            return (
              <Link
                href={href}
                className='text-[#1D1D1B] text-2xl w-full p-2 rounded-r-xl hover:bg-orange-500/90 hover:text-white data-[active=true]:bg-logoorange data-[active=true]:text-white flex items-center gap-2'
                data-active={activeTab === tab}
                key={tab}
              >
                <Icon className='size-6' />
                {tab}
              </Link>
            );
          })}
        </nav>
        <button
          className='hover:bg-orange-500/90 hover:text-white text-sm p-2 text-[#FF3535] rounded-r-lg capitalize font-light flex gap-2 items-center'
          popoverTarget='signout-popup'
          popoverTargetAction='show'
        >
          <ExitIcon className='pointer-events-none shrink-0 size-[16px]' />
          Sair
        </button>
      </aside>
    </>
  );
}
