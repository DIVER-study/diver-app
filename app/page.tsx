import { SideBar } from '@/components/SideBar';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const { auth } = await createClient();

  const { data } = await auth.getUser();

  return (
    <div className='flex h-screen'>
      <SideBar activeTab='home' />
      <main className='flex-1 h-full content-center'>
        <h1 className='mx-auto text-xl font-poppins font-medium text-orange-700/80 text-center'>
          Olá {data.user && (data.user.user_metadata.display_name || data.user.user_metadata.email)}
        </h1>
      </main>
    </div>
  );
}
