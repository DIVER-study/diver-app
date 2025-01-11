// import LogOutButton from '@/components/LogOut';
import { SideBar } from '@/components/SideBar';
import { createClient } from '@/utils/supabase/server';
// import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1 h-full content-center'>
        <div className='mx-auto text-6xl font-jetbrains-mono font-bold text-center'>Hello</div>
        <div className='mx-auto text-6xl font-poppins font-bold text-center'>World.</div>
        <div className='mx-auto text-xl font-poppins font-medium text-orange-400/80 text-center mt-12'>
          {data.user && (data.user.user_metadata.display_name || data.user.user_metadata.email)}
        </div>
        {/* <div className='mx-auto text-xl font-poppins font-medium text-center mt-12 space-x-4'> */}
        {/*   <LogOutButton /> */}
        {/*   <Link */}
        {/*     href='/settings' */}
        {/*     className='p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500' */}
        {/*   > */}
        {/*     Configurações de Usuário */}
        {/*   </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
}
