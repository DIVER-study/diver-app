import { SideBar } from '@/components/SideBar';
import { createClient } from '@/utils/supabase/server';

export default async function RankingPage() {
  const supabase = await createClient();

  // TODO: criar e usar uma tabela oficial de usuários. Temporariamente utilizando uma gerada aleatoriamente.
  const { data: users, error } = await supabase.from('temp_profiles').select('*');

  if (error) console.error(`Erro: ${error.message}`);

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1 overflow-y-scroll content-center'>
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
            {users?.map((user, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{user.display_name}</td>
                <td>50xp</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
