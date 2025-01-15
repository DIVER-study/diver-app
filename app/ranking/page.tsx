import { SideBar } from '@/components/SideBar';
import { UserRankingItem } from '@/components/UserRankingItem';
import { createClient } from '@/utils/supabase/server';

export default async function RankingPage() {
  const supabase = await createClient();

  const { data: users, error } = await supabase.from('profiles').select('*');

  if (error) console.error(`Erro: ${error.message}`);

  return (
    <div className='flex h-screen'>
      <SideBar activeTab='ranking' />
      <main className='flex-1 overflow-y-scroll content-center'>
        <table className='border-collapse my-4 min-w-[400px] [&_th]:p-4 [&_td]:p-4 mx-auto w-full max-w-[600px]'>
          <caption>Ranking</caption>
          <thead>
            <tr className='bg-emerald-600 text-white text-left font-bold'>
              <th scope='col'>Posição</th>
              <th scope='col'>Usuário</th>
              <th scope='col'>Experiência</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(({ avatar_url, display_name }, index) => (
              <UserRankingItem
                key={display_name}
                avatarUrl={avatar_url}
                displayName={display_name}
                index={index}
                exp={50}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
