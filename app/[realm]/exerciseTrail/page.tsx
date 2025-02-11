import { SideBar } from '@/components/SideBar';
import { SubjectInfo, ModuleList, type Realms } from './client';
import { UserStore } from '@/components/UserStore';

type Params = Promise<{ realm: string }>;
type SearchParams = Promise<{
  temaId: string;
}>;

export default async function ExerciseTrailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { temaId } = await searchParams;
  const { realm } = await params;

  return (
    <div className='flex h-screen'>
      <UserStore />
      <SideBar activeTab='estudos' />
      <main className='flex-1 h-full space-y-8 overflow-y-scroll py-8'>
        {realm.match(/^(?:behaviorism|gestalt|tsc)$/g) ? (
          <div className='flex p-[6%] gap-[4.5rem] w-full'>
            <SubjectInfo
              subjectId={Number(temaId)}
              realm={realm as Realms}
            />
            <ModuleList
              subjectId={Number(temaId)}
              realm={realm as Realms}
            />
          </div>
        ) : (
          <div className='content-center text-center w-full'>
            Algo deu errado. Reino &apos; {realm} &apos; não existe.
          </div>
        )}
      </main>
    </div>
  );
}
