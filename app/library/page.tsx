import { SideBar } from '@/components/SideBar';
import { LibrarySection } from '@/components/LibraryComponents';

/*
 * TODO: pegar do banco de dados as informações como:
 * links, textos, imagens, etc ...
 * */

export default function LibraryPage() {
  return (
    <div className='flex h-screen'>
      <SideBar activeTab='biblioteca' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll'>
        <LibrarySection sectionName='Behaviorismo' />
        <LibrarySection sectionName='Gestalt' />
        <LibrarySection sectionName='Teoria Sociocultural' />
      </main>
    </div>
  );
}
