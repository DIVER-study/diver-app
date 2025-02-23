import { SideBar } from '@/components/SideBar';
import { LibraryCard } from '@/components/LibraryComponents';
import { UserStore } from '@/components/UserStore';

export default function LibraryPage() {
  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='biblioteca' />
      <main className='flex-1 max-h-full py-8 px-14 overflow-y-auto overscroll-y-contain'>
        <div className='columns-2 space-y-30 gap-15 max-w-200 mx-auto'>
          <LibraryCard
            category='aprendizagem e desenvolvimento'
            behaviorismSlug='condicionamentos'
            gestaltSlug='insight'
            tscSlug='desenvolvimento-proximal'
          />
          <LibraryCard
            category='percepção e cognição'
            behaviorismSlug='estímulos-e-reflexos'
            gestaltSlug='leis-da-percepção'
            tscSlug='cognição-mediada-pela-cultura'
          />
          <LibraryCard
            category='motivação e comportamento'
            behaviorismSlug='reforço-e-punição'
            gestaltSlug='auto-organização'
            tscSlug='motivação-social'
          />
          <div className='pt-30 space-y-30'>
            <LibraryCard
              category='linguagem e comunicação'
              behaviorismSlug='aprendizagem-verbal'
              gestaltSlug='significado-na-percepção'
              tscSlug='interação-social-e-linguagem'
            />
            <LibraryCard
              category='educação e ensino'
              behaviorismSlug='ensino-programado'
              gestaltSlug='reorganização-de-ideias'
              tscSlug='ensino-colaborativo'
            />
            <LibraryCard
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
