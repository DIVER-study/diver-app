import { StudySections } from '@/components/StudyComponents';
import { SearchBar } from '@/components/SearchBar';
import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';

export default function RealmsPage() {
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='estudos' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll py-8'>
        <div className='flex items-center mx-auto max-w-screen-md'>
          <div className='flex-1' />
          <SearchBar />
        </div>
        <h1 className='font-bold uppercase mx-auto max-w-screen-md text-3xl'>trilha de aprendizagem</h1>
        <StudySections />
      </main>
    </div>
  );
}
