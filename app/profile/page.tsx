'use client';

import { SideBar } from '@/components/SideBar';
import { SpinnyLoader } from '@/components/SmallerBits';
import { UserStore } from '@/components/UserStore';
import { useUserStore } from '@/stores/userStore';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { profile } = useUserStore((state) => state.user);
  // if (data) redirect(`/profile/${data.display_name}`);

  useEffect(() => {
    if (profile) {
      const { display_name } = profile;
      redirect(`/profile/${display_name}`);
    } else {
      redirect('#');
    }
  }, [profile]);

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='perfil' />
      <main className='flex-1 h-full content-center'>
        <SpinnyLoader />
      </main>
    </div>
  );
}
