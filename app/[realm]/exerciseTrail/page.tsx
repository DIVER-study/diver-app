import { SideBar } from '@/components/SideBar';
import { SubjectInfo, ModuleList, type Realms } from './client';
import { UserStore } from '@/components/UserStore';

type Props = {
  params: Promise<{ realm: string }>;
  searchParams: Promise<{ temaId: string }>;
};

export default async function ExerciseTrailPage({ params, searchParams }: Props) {
  const { temaId } = await searchParams;
  const { realm } = await params;

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='estudos' />
      {realm.match(/^(?:behaviorism|gestalt|tsc)$/g) ? (
        <main className='py-14 lg:py-20 lg:justify-center gap-14 flex grow px-14 flex-col lg:flex-row max-h-screen overflow-y-auto'>
          <SubjectInfo
            subjectId={Number(temaId)}
            realm={realm as Realms}
          />
          <ModuleList
            subjectId={Number(temaId)}
            realm={realm as Realms}
          />
        </main>
      ) : (
        <main className='content-center text-center w-full'>
          Algo deu errado. Reino &apos; {realm} &apos; não existe.
        </main>
      )}
    </div>
  );
}
