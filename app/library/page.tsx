import { SideBar } from '@/components/SideBar';
import { SearchBar } from '@/components/SearchBar';
import { LibrarySections } from '@/components/LibraryComponents';
import { UserStore } from '@/components/UserStore';

export default function LibraryPage() {
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='biblioteca' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll py-8'>
        <div className='flex items-center mx-auto max-w-(--breakpoint-md)'>
          <div className='flex-1' />
          <SearchBar />
        </div>
        <h1 className='font-bold uppercase mx-auto max-w-(--breakpoint-md) text-3xl'>biblioteca de estudos</h1>
        <LibrarySections />
      </main>
    </div>
  );
}
