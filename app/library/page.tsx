import { SideBar } from '@/components/SideBar';

/*
 * TODO: pegar do banco de dados as informações como:
 * links, textos, imagens, etc ...
 * */

export default function LibraryPage() {
  return (
    <div className='flex h-screen'>
      <SideBar activeTab='biblioteca' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll'>
        <section className='space-y-4 mx-auto max-w-screen-md'>
          <h2>Behaviorismo</h2>
          <hr className='bg-neutrals-700' />
          <div className='flex gap-4 overflow-x-scroll w-min'>
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
          </div>
        </section>
        <section className='space-y-4 mx-auto max-w-screen-md overflow-hidden'>
          <h2>Gestalt</h2>
          <hr className='bg-neutrals-700' />
          <div className='flex gap-4 overflow-x-scroll w-min'>
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
          </div>
        </section>
        <section className='space-y-4 mx-auto max-w-screen-md'>
          <h2>Teoria Sociocultural</h2>
          <hr className='bg-neutrals-700' />
          <div className='flex gap-4 overflow-x-scroll w-min'>
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
            <div className='bg-neutral-400 size-40' />
          </div>
        </section>
      </main>
    </div>
  );
}
