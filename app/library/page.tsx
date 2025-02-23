'use client';

import { SideBar } from '@/components/SideBar';
import { LibraryCard } from '@/components/LibraryComponents';
import { UserStore } from '@/components/UserStore';
import { Button } from '@/components/ui/Button';
import { useRef } from 'react';

export default function LibraryPage() {
  const scrollbox = useRef<HTMLElement>(null);
  const libraryCard = useRef<HTMLElement>(null);
  const cards = [
    'aprendizagem-e-desenvolvimento',
    'linguagem-e-comunicação',
    'percepção-e-cognição',
    'educação-e-ensino',
    'motivação-e-comportamento',
    'aplicações-práticas-e-tecnologias',
  ];
  const scrollWithOffset = (elementId: string, offset: number, scrolb: HTMLElement) => {
    libraryCard.current?.removeAttribute('data-selected');
    libraryCard.current = document.getElementById(elementId);
    scrolb.scrollTo({
      top: (libraryCard.current?.offsetTop || 0) - offset,
      behavior: 'smooth',
    });
    libraryCard.current?.setAttribute('data-selected', '');
  };

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='biblioteca' />
      <main
        className='flex-1 max-h-full py-8 px-14 overflow-y-auto overscroll-y-contain space-y-8 scroll-smooth'
        ref={scrollbox}
      >
        <div className='px-6 bg-beige-50 rounded-full shadow-cogtec sticky top-0'>
          <div
            id='local-nav'
            className='overflow-x-auto py-3 w-full flex gap-4'
          >
            {cards.map((txt) => (
              <Button
                key={txt}
                variant='outline'
                size='sm'
                className='capitalize text-nowrap'
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  const localNav = document.getElementById('local-nav');
                  localNav?.scrollTo({ left: target?.offsetLeft - target?.offsetWidth / 2 || 0, behavior: 'smooth' });
                  scrollWithOffset(txt, 150, scrollbox.current!);
                }}
              >
                {txt.replaceAll('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
        <div className='columns-2 space-y-30 gap-15 max-w-(--breakpoint-lg) mx-auto'>
          <LibraryCard
            id='aprendizagem-e-desenvolvimento'
            category='aprendizagem e desenvolvimento'
            behaviorismSlug='condicionamentos'
            gestaltSlug='insight'
            tscSlug='desenvolvimento-proximal'
          />
          <LibraryCard
            id='percepção-e-cognição'
            category='percepção e cognição'
            behaviorismSlug='estímulos-e-reflexos'
            gestaltSlug='leis-da-percepção'
            tscSlug='cognição-mediada-pela-cultura'
          />
          <LibraryCard
            id='motivação-e-comportamento'
            category='motivação e comportamento'
            behaviorismSlug='reforço-e-punição'
            gestaltSlug='auto-organização'
            tscSlug='motivação-social'
          />
          <div className='pt-30 space-y-30'>
            <LibraryCard
              id='linguagem-e-comunicação'
              category='linguagem e comunicação'
              behaviorismSlug='aprendizagem-verbal'
              gestaltSlug='significado-na-percepção'
              tscSlug='interação-social-e-linguagem'
            />
            <LibraryCard
              id='educação-e-ensino'
              category='educação e ensino'
              behaviorismSlug='ensino-programado'
              gestaltSlug='reorganização-de-ideias'
              tscSlug='ensino-colaborativo'
            />
            <LibraryCard
              id='aplicações-práticas-e-tecnologias'
              category='aplicações práticas e tecnologias'
              behaviorismSlug='gamificação'
              gestaltSlug='design-cognitivo'
              tscSlug='ambientes-digitais'
            />
          </div>
        </div>
      </main>
    </div>
  );
}
