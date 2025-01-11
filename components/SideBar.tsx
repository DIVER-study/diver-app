'use client';

import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export function SideBar() {
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
  return (
    <>
      <aside
        popover='auto'
        id='signout-popup'
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 hidden grid-cols-2 gap-4 [&:popover-open]:grid ring-1 ring-neutral-500'
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
      </aside>
      <div className='invisible w-20 h-screen' />
      <nav className='navbar fixed top-0 left-0 flex flex-col w-20 hover:w-40 h-screen transition-all p-4 gap-4 justify-between group bg-neutral-200'>
        <div className='flex-1 flex flex-col gap-4'>
          <Image
            src='/Logo.png'
            width={1020}
            height={364}
            alt='imagem da logo Diver, a palavra DIVER escrita onde a letra D possui um rostinho e tentáculos de polvo'
            priority
            className='h-[40px] object-cover object-left'
          />
          <Link
            href='/'
            className='bg-blue-500 hover:bg-blue-500/80 p-2 text-neutral-50 text-ellipsis overflow-hidden'
          >
            <p className='invisible group-hover:visible'>HOME</p>
          </Link>
          <Link
            href='/realms'
            className='bg-blue-500 hover:bg-blue-500/80 p-2 text-neutral-50 text-ellipsis overflow-hidden'
          >
            <p className='invisible group-hover:visible'>REINOS</p>
          </Link>
          <Link
            href='/library'
            className='bg-blue-500 hover:bg-blue-500/80 p-2 text-neutral-50 text-ellipsis overflow-hidden'
          >
            <p className='invisible group-hover:visible'>BIBLIOTECA</p>
          </Link>
          <Link
            href='/ranking'
            className='bg-blue-500 hover:bg-blue-500/80 p-2 text-neutral-50 text-ellipsis overflow-hidden'
          >
            <p className='invisible group-hover:visible'>RANKING</p>
          </Link>
          <Link
            href='/settings'
            className='bg-blue-500 hover:bg-blue-500/80 p-2 text-neutral-50 text-ellipsis overflow-hidden'
          >
            <p className='invisible group-hover:visible'>PERFIL</p>
          </Link>
        </div>
        <button
          className='bg-red-500 hover:bg-red-500/80 p-2 text-neutral-50 text-ellipsis overflow-hidden'
          popoverTarget='signout-popup'
          popoverTargetAction='show'
        >
          <p className='invisible group-hover:visible'>SAIR</p>
        </button>
      </nav>
    </>
  );
}
