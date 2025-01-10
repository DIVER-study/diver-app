import { SideBar } from '@/components/SideBar';
import React from 'react';

export default function RealmsPage() {
  return (
    <div className='flex h-screen m-8'>
      <SideBar />
      <div className='flex-1 space-y-4 max-w-lg mx-auto'>
        <h2>Teorias</h2>
        <div className='p-4 gap-4 flex ring-1 ring-neutral-500'>
          <div className='flex-1 space-y-4'>
            <h3>
              <strong>Behaviorismo</strong>
            </h3>
            <div className='flex gap-2 items-center'>
              <div className='h-2 bg-neutral-600 flex-1' />
              <p className='text-sm'>lorem ipsum</p>
            </div>
          </div>
          <div className='size-20 bg-neutral-700' />
        </div>
        <div className='p-4 gap-4 flex ring-1 ring-neutral-500'>
          <div className='flex-1 space-y-4'>
            <h3>
              <strong>Gestalt</strong>
            </h3>
            <div className='flex gap-2 items-center'>
              <div className='h-2 bg-neutral-600 flex-1' />
              <p className='text-sm'>lorem ipsum</p>
            </div>
          </div>
          <div className='size-20 bg-neutral-700' />
        </div>
        <div className='p-4 gap-4 flex ring-1 ring-neutral-500'>
          <div className='flex-1 space-y-4'>
            <h3>
              <strong>Teoria Sociocultural</strong>
            </h3>
            <div className='flex gap-2 items-center'>
              <div className='h-2 bg-neutral-600 flex-1' />
              <p className='text-sm'>lorem ipsum</p>
            </div>
          </div>
          <div className='size-20 bg-neutral-700' />
        </div>
      </div>
    </div>
  );
}
