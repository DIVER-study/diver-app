import { SideBar } from '@/components/SideBar';
import ClientRankingPage from './clientPage';

export default function RankingPage() {
  return (
    <div className='flex h-screen'>
      <SideBar activeTab='ranking' />
      <ClientRankingPage />
    </div>
  );
}
