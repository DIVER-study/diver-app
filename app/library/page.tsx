import { SideBar } from '@/components/SideBar';

/*
 * TODO: pegar do banco de dados as informações como:
 * links, textos, imagens, etc ...
 * */

export default function LibraryPage() {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1 h-full space-y-8'>
        <section className='space-y-4'>
          <h2>Behaviorismo</h2>
          <hr className='bg-neutrals-700' />
          <div className='flex gap-4 overflow-x-scroll'>
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
          </div>
        </section>
        <section className='space-y-4'>
          <h2>Gestalt</h2>
          <hr className='bg-neutrals-700' />
          <div className='flex gap-4 overflow-x-scroll'>
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
          </div>
        </section>
        <section className='space-y-4'>
          <h2>Teoria Sociocultural</h2>
          <hr className='bg-neutrals-700' />
          <div className='flex gap-4 overflow-x-scroll'>
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
          </div>
        </section>
      </div>
    </div>
  );
}
