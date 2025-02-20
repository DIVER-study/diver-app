import { SideBar } from '@/components/SideBar';
import { LibraryCard } from '@/components/LibraryComponents';
import { UserStore } from '@/components/UserStore';

export default function LibraryPage() {
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='biblioteca' />
      <main className='flex-1 h-full py-8 px-14'>
        <LibraryCard />
      </main>
    </div>
  );
}
