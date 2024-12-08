import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className='w-full h-screen content-center'>
      <div className='mx-auto text-6xl font-jetbrains-mono font-bold text-center'>
        Hello
      </div>
      <div className='mx-auto text-6xl font-poppins font-bold text-center'>
        World.
      </div>
      <div className='mx-auto text-xl font-poppins font-medium text-orange-400/80 text-center mt-12'>
        {data.user ? data.user.user_metadata.email : ''}
      </div>
    </div>
  );
}
