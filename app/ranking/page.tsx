import { SideBar } from '@/components/SideBar';
import ClientRankingPage from './client';
import { UserStore } from '@/components/UserStore';

export default function RankingPage() {
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='ranking' />
      <ClientRankingPage />
    </div>
  );
}
