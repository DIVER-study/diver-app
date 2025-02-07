'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export default function LogOutButton() {
  const supabase = createClient();

  const logOut = async () => {
    toast.loading('Signing Out...', {
      id: 'loading-toast',
    });

    const { error } = await supabase.auth.signOut();

    toast.dismiss('loading-toast');

    if (error) {
      toast.error(`Error ${error.code}; ${error.message}`);
    } else {
      toast.success('Signed Out Successfuly');
      redirect('/login');
    }
  };

  return (
    <button
      onClick={logOut}
      className='p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500'
    >
      Log Out
    </button>
  );
}
