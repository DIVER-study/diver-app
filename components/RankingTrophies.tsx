import { GoldTrophy, SilverTrophy, BronzeTrophy, Shine } from './svgs/Svgs';

export function RankingTrophies() {
  return (
    <div className='flex items-center justify-center pb-12 pt-32'>
      <Shine className='relative -bottom-12' />
      <SilverTrophy className='size-40' />
      <GoldTrophy className='size-40 relative -top-20' />
      <BronzeTrophy className='size-40' />
      <Shine className='relative -top-12' />
    </div>
  );
}

