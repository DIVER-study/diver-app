import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';
import { ProfileClientPage } from './client';

export default function ProfilePage() {
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='perfil' />
      <main className='flex-1 h-full overflow-y-scroll px-12 pt-24 pb-8'>
        <ProfileClientPage />
      </main>
    </div>
  );
}
