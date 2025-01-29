import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';
import { redirect } from 'next/navigation';

export default async function page({ params }: { params: Promise<{ realm: string }> }) {
  const { realm } = await params;
  if (realm === 'behaviorism') {
    redirect('/behaviorism/exerciseTrail?temaId=1');
  } else if (realm === 'gestalt') {
    redirect('/gestalt/exerciseTrail?temaId=1');
  } else if (realm === 'tsc') {
    redirect('/tsc/exerciseTrail?temaId=1');
  }
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='estudos' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll py-8 content-center'>
        <span className='w-max mx-auto block'>você parece perdide {"'-'"}</span>
      </main>
    </div>
  );
}
