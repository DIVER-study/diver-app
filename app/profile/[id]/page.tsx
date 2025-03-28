import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';
import { ProfileClientPage } from '../client';
import { createClient } from '@/utils/supabase/server';
import { getUserId } from '@/app/server';

export default async function OtherUserPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data } = await supabase.from('profiles').select('*').eq('display_name', id).limit(1).single();
  const currentUserId = await getUserId();

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='perfil' />
      <main className='flex-1 h-full overflow-y-scroll px-12 pt-24 pb-8'>
        {data ? (
          <ProfileClientPage
            profile={data}
            editable={data.id === currentUserId.id}
          />
        ) : (
          'Usuário não encontrado.'
        )}
      </main>
    </div>
  );
}
