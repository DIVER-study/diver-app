'use client';

import { SideBar } from '@/components/SideBar';
import { UserStore } from '@/components/UserStore';
import { useUserStore } from '@/stores/userStore';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { profile } = useUserStore((state) => state.user);

  useEffect(() => {
    if (profile) {
      redirect(`/profile/${profile.display_name}`);
    }
  }, [profile]);

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='perfil' />
      <main className='flex-1 h-full overflow-y-scroll px-12 pt-24 pb-8'></main>
    </div>
  );
}
