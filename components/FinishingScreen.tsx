import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';
import { FilledStar, FestiveCone } from '@/components/svgs/Svgs';

type Props = { currentRealm: string; subjectId: number; xpDelta: number };

export const FinishingScreen = ({ currentRealm, subjectId, xpDelta }: Props) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#F8F3E0] text-black p-6 absolute top-0 left-0 w-full'>
      <div className='flex gap-10 mt-[8rem]'>
        <div>
          <FestiveCone className='shrink-0 size-14 text-ranking-gold' />
        </div>
        <h1
          data-animate={animate}
          className='text-4xl font-bold mb-2 mt-4 transition-transform transform data-animate:scale-125 text-[#FD7401]'
        >
          Parabéns
        </h1>
        <div>
          <FestiveCone className='shrink-0 size-14 text-ranking-gold rotate-270' />
        </div>
      </div>
      
      <p className='text-[#FD7401] text-xl mb-[2rem] font-medium'>Você concluiu esse exercício</p>

      <div className='flex gap-5 mb-10 bg-white rounded-3xl w-[14rem] items-center justify-around'>
        <div className='px-3 py-4 flex items-center justify-center transition-transform transform hover:scale-110'>
          <span className='text-3xl'>
            <FilledStar className='shrink-0 size-12 text-ranking-gold' />
          </span>
        </div>
        <div className='px-4 py-4 text-xl transition-transform transform hover:scale-110 font-semibold'>
          + {xpDelta}XP
        </div>
        
      </div>

      <Button asChild className='px-6 py-2 text-white text-base font-extrabold border-0 border-[#884E1D] border-solid border-b-4 self-end items-end mr-[12rem] mt-[8rem]'>
        <Link href={`/${currentRealm}/exerciseTrail?temaId=${subjectId}`}>Concluir</Link>
      </Button>
    </div>
  );
};
