import { SideBar } from '@/components/SideBar';
import { SearchBar } from '@/components/SearchBar';

/*
 * TODO: pegar do banco de dados as informações como:
 * links, textos, imagens, etc ...
 * */

export default function LibraryPage() {
  return (
    <div className='flex h-screen'>
      <SideBar activeTab='biblioteca' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll py-8'>
        <div className='flex items-center mx-auto max-w-screen-md'>
          <div className='flex-1' />
          <SearchBar />
        </div>
      </main>
    </div>
  );
}
