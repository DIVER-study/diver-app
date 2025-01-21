'use client';

import { useUserStore } from '@/stores/userStore';
import { useEffect } from 'react';

export function UserStore() {
  const setUserFromDB = useUserStore((state) => state.setUserFromDB);

  useEffect(() => {
    const initializeUserStore = async () => {
      await setUserFromDB();
    };
    initializeUserStore();
  });
  return <></>;
}
