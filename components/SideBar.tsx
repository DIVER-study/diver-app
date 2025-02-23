'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { CogTecLogo, ExitIcon, LibrarySideIcon, ProfileIcon, RankingIcon, StudyIcon } from './svgs/Svgs';
import { useRef } from 'react';
import { useUserStore } from '@/stores/userStore';
import {
  AlertBox,
  AlertBoxAction,
  AlertBoxCancel,
  AlertBoxDescription,
  AlertBoxFooter,
  AlertBoxHeader,
  AlertBoxTitle,
} from './ui/AlertBox';

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
      <nav className='w-fit h-screen max-h-screen py-10 bg-logo-100 rounded-r-3xl flex-col justify-between flex sticky top-0 left-0'>
        <div className='justify-center items-center gap-2 inline-flex text-logo-200 px-4'>
          <CogTecLogo className='size-12' />
          <span className='text-4xl font-extrabold'>CogTec</span>
        </div>
        <div className='grow flex-col justify-center items-start flex gap-2.5'>
          {['estudos', 'biblioteca', 'ranking', 'perfil'].map((tab) => {
            const { href, icon: Icon } = tabRoutes[tab];
            return (
              <Link
                href={href}
                className='pl-6 py-3 hover:bg-logo-200 data-active:bg-logo-200 rounded-r-3xl items-center gap-2 inline-flex hover:text-white data-active:text-white text-lg font-bold text-black w-full'
                data-active={activeTab === tab || null}
                key={tab}
              >
                <Icon className='size-10' />
                {tab}
              </Link>
            );
          })}
        </div>
        <button
          className='px-4 justify-start items-center gap-2 inline-flex text-warning text-lg font-medium cursor-pointer'
          popoverTarget='signout-popup'
          popoverTargetAction='show'
        >
          <ExitIcon className='pointer-events-none shrink-0 size-6' />
          Sair
        </button>
      </nav>
      <SignOutAlert
        id='signout-popup'
        onActionPressed={signOut}
        onCancelPressed={() => signOutPopup.current?.hidePopover()}
        ref={signOutPopup}
        popover='manual'
      />
    </>
  );
}

type SignOutAlertProps = React.HTMLAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement> & {
    onActionPressed: React.MouseEventHandler<HTMLElement>;
    onCancelPressed: React.MouseEventHandler<HTMLElement>;
  };

function SignOutAlert({ onActionPressed, onCancelPressed, ...props }: SignOutAlertProps) {
  return (
    <AlertBox {...props}>
      <AlertBoxHeader>
        <AlertBoxTitle>Tem certeza que quer sair? :(</AlertBoxTitle>
        <AlertBoxDescription>Sentiremos sua falta! Estaremos sempre aqui para te ajudar a estudar!</AlertBoxDescription>
      </AlertBoxHeader>
      <AlertBoxFooter>
        <AlertBoxAction onClick={onActionPressed}>Sair</AlertBoxAction>
        <AlertBoxCancel onClick={onCancelPressed}>Cancelar</AlertBoxCancel>
      </AlertBoxFooter>
    </AlertBox>
  );
}
