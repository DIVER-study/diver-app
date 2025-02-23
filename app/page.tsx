import { StudySection } from '@/components/StudyComponents';
import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';
import { getUserDisplayname } from './server';

export default async function RealmsPage() {
  const displayName = async () => await getUserDisplayname();

  return (
    <div className='min-h-screen flex gap-14 mr-14 max-w-screen'>
      <UserStore />
      <SideBar activeTab='estudos' />
      <main className='py-14 inline-flex flex-col flex-1 gap-4'>
        <div className='space-y-2'>
          <div className='text-logo-200 text-3xl font-bold'>
            Olá,
            <span className='text-black'> {await displayName()}! </span>
            :)
          </div>
          <span className='font-semibold text-xl ml-2 text-neutral-400'>Vamos estudar um pouco?</span>
        </div>
        <StudySection
          sectionName='Behaviorismo'
          sectionType='behaviorism'
          motd='Estímulo no comando, resposta na ação!'
        />
        <StudySection
          sectionName='Gestalt'
          sectionType='gestalt'
          motd='onde as partes se juntam'
        />
        <StudySection
          sectionName='Teoria Sociocultural'
          sectionType='tsc'
          motd='sempre no modo multiplayer'
        />
      </main>
    </div>
  );
}
