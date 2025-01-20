'use client';

type SectionProps = {
  sectionName: string;
};

export function LibrarySection({ sectionName }: SectionProps) {
  return (
    <section className='space-y-4 mx-auto max-w-screen-md'>
      <h2>{sectionName}</h2>
      <hr className='bg-neutrals-700' />
      <div className='grid grid-flow-col auto-cols-[100%] gap-2 overflow-x-scroll scroll-smooth snap-x snap-proximity'>
        {new Array(4).fill('').map((_, idx) => (
          <div
            key={idx}
            className='grid grid-flow-col auto-cols-[1fr] gap-2'
          >
            {new Array(4).fill('').map((_, index) => (
              <div
                className='w-32 aspect-square bg-black rounded-lg snap-start'
                key={index}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
