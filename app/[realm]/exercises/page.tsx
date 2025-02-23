import ExercisePageClient from './client';
import { grabExercises } from './server';

type PageProps = {
  params: Promise<{ realm: string }>;
  searchParams: Promise<{ moduleId: string; temaId: string }>;
};

const shuffleArray = <T,>(array: Array<T>) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default async function ExercisePage({ params, searchParams }: PageProps) {
  const { realm } = await params;
  const { moduleId, temaId } = await searchParams;
  const regex = /(?:behaviorism|gestalt|tsc)/g;

  const { data: exercises, error } = await grabExercises(Number(moduleId));

  if (error) console.error('Houve um erro buscando os exercícios. ', error.message);

  return (
    <ExercisePageClient
      exercises={shuffleArray(exercises)}
      realm={realm.match(regex) ? (realm as 'behaviorism' | 'gestalt' | 'tsc') : 'behaviorism'}
      subjectId={Number(temaId)}
      moduleId={Number(moduleId)}
    />
  );
}
