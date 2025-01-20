'use client';

type SectionProps = {
  sectionName: string;
  finished: boolean;
  started: boolean;
};

export function LibrarySection({ sectionName, finished = false, started = false }: SectionProps) {
  return (
    <div className='space-y-1 mx-auto max-w-screen-md'>
      <div className='flex flex-row items-center p-1'>
        <h2 className='flex-1 uppercase text-2xl'>{sectionName}</h2>
        <div className='border-2 border-black p-1 rounded-md uppercase text-md'>
          {finished ? 'concluido' : started ? 'em andamento' : 'a fazer'}
        </div>
      </div>
      <div className='grid grid-flow-col auto-cols-[1fr] gap-8 overflow-x-scroll scroll-smooth snap-x rounded-xl border-2 border-black p-4'>
        {new Array(8).fill('').map((_, idx) => (
          <div
            key={idx}
            className='w-32 aspect-[7/8] snap-center space-y-2'
          >
            <div className='rounded-lg bg-black size-full' />
            <p className='text-sm uppercase text-center'>definição</p>
          </div>
        ))}
      </div>
    </div>
  );
}
