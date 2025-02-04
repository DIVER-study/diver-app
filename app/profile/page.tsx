import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) console.error(error);
  if (!user)
    return (
      <div className='flex h-screen'>
        <UserStore />
        <SideBar activeTab='perfil' />
        <main className='flex-1 h-full overflow-y-scroll px-12 pt-24 pb-8'>Ocorreu um erro.</main>
      </div>
    );
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).limit(1).single();
  if (data) redirect(`/profile/${data.display_name}`);

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='perfil' />
      <main className='flex-1 h-full overflow-y-scroll px-12 pt-24 pb-8'></main>
    </div>
  );
}
