import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export const PopUpXp = ({ currentRealm, subjectId }: { currentRealm: string; subjectId: number }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 absolute top-0 left-0 w-full'>
      <h1
        data-animate={animate}
        className='text-3xl font-bold mb-6 transition-transform transform data-animate:scale-125'
      >
        PARABÉNS
      </h1>

      <div className='flex gap-4 mb-6'>
        <button className='border-2 border-black rounded-lg px-8 py-4 text-xl transition-transform transform hover:scale-110'>
          XP
        </button>
        <button className='border-2 border-black rounded-lg px-8 py-4 flex items-center justify-center transition-transform transform hover:scale-110'>
          <span className='text-3xl'>🏆</span>
        </button>
      </div>

      <div className='w-full max-w-md border-t-2 border-black pt-4'>
        <div className='flex justify-between text-lg font-medium mb-2'>
          <span>TEMAS PARA ESTUDO</span>
          <span>ERRADAS</span>
        </div>

        <div className='flex justify-between'>
          <div className='flex flex-col gap-2 w-3/4'>
            <div className='h-4 bg-black w-full'></div>
            <div className='h-4 bg-black w-full'></div>
            <div className='h-4 bg-black w-full'></div>
            <div className='h-4 bg-black w-full'></div>
          </div>

          <div className='flex flex-col gap-2 w-1/4 items-end'>
            <div className='w-5 h-5 border-2 border-black rounded-full'></div>
            <div className='w-5 h-5 border-2 border-black rounded-full'></div>
            <div className='w-5 h-5 border-2 border-black rounded-full'></div>
          </div>
        </div>
      </div>

      <button
        className='absolute bottom-6 right-6 border-2 border-black px-6 py-3 flex items-center bg-white transition-transform transform hover:scale-110'
        onClick={() => {
          redirect(`/${currentRealm}/exerciseTrail?temaId=${subjectId}`);
        }}
      >
        <span className='text-black text-xl'>✔</span>
      </button>
    </div>
  );
};
