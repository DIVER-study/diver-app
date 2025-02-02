import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';

export default async function page({ params }: { params: Promise<{ realm: string }> }) {
  const { realm } = await params;
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='estudos' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll py-8 content-center'>
        <span className='w-max mx-auto block'>Algo deu errado. </span>
        {!realm.match(/^(?:behaviorism|gestalt|tsc)$/g) && (
          <span className='w-max mx-auto block'>Reino &apos; {realm} &apos; não existe.</span>
        )}
      </main>
    </div>
  );
}
