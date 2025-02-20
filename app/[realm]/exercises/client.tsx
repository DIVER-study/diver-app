'use client';

import { useRef, useState, useTransition } from 'react';
import { ExerciseType, updateUserProgress, updateUserXp } from './server';
import { Button } from '@/components/ui/Button';
import { CloseIcon } from '@/components/svgs';
import { LoadingBuffer } from '@/components/ui/LoadingBuffer';
import {
  AlertBoxAction,
  AlertBoxCancel,
  AlertBoxDescription,
  AlertBoxFooter,
  AlertBoxHeader,
  AlertBox,
  AlertBoxTitle,
} from '@/components/ui/AlertBox';
import { toast } from 'sonner';
import Link from 'next/link';
import { FinishingScreen } from '@/components/FinishingScreen';

type ExerciseClientProps = {
  exercises: ExerciseType[];
  realm: 'behaviorism' | 'gestalt' | 'tsc';
  moduleId: number;
  subjectId: number;
};

export default function ExercisePageClient({ exercises, realm, subjectId, moduleId }: ExerciseClientProps) {
  const exitAlert = useRef<HTMLDivElement>(null);
  const rightAnswer = useRef<HTMLDivElement>(null);
  const wrongAnswer = useRef<HTMLDivElement>(null);
  const userXp = useRef<number>(0);

  const [currentExercise, setCurrentExercise] = useState<ExerciseType>(exercises[0]);
  const [exerciseProgress, setExerciseProgress] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [finished, setFinished] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    const correct = selectedOption === currentExercise.answer;
    let xpDelta = 0;

    if (correct && rightAnswer.current) {
      rightAnswer.current.showPopover();
      xpDelta = 2;
    } else if (wrongAnswer.current) {
      wrongAnswer.current.showPopover();
      xpDelta = 1;
    }
    userXp.current += xpDelta;

    toast(
      <div className='bg-logo-100 text-center size-fit p-2 text-logo-200 font-bold text-3xl shadow-cogtec rounded-xl mx-auto'>
        + {xpDelta}xp
      </div>,
      {
        style: {
          width: '100%',
        },
        unstyled: true,
        position: 'top-center',
      }
    );

    setExerciseProgress((prev) => prev + 1);
    setSelectedOption(-1);

    if (exerciseProgress + 1 === exercises.length) {
      startTransition(async () => {
        const { error } = await updateUserProgress(moduleId, subjectId, realm);
        if (error) toast.error(error.message);
        await updateUserXp(userXp.current);
        wrongAnswer.current?.hidePopover();
        rightAnswer.current?.hidePopover();
        setFinished(true);
      });
    } else {
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setCurrentExercise(exercises[exerciseProgress + 1]);
        wrongAnswer.current?.hidePopover();
        rightAnswer.current?.hidePopover();
      });
    }
  };
  return (
    <div className='flex flex-col p-10 gap-16 items-center justify-start relative h-[100dvh]'>
      <ExitAlert
        onCancelPressed={() => exitAlert.current?.hidePopover()}
        exitLink={`/${realm}/exerciseTrail?temaId=${subjectId}`}
        ref={exitAlert}
        popover='manual'
      />
      <RightAnswerAlert
        onActionPressed={() => rightAnswer.current?.hidePopover()}
        ref={rightAnswer}
        popover='manual'
      />
      <WrongAnswerAlert
        onActionPressed={() => wrongAnswer.current?.hidePopover()}
        ref={wrongAnswer}
        popover='manual'
        explanation={currentExercise.explanation}
      />
      {/* Progress Bar */}
      <div
        className='flex w-full gap-8 justify-center items-center'
        hidden={finished || undefined}
      >
        <Button
          size='icon'
          variant='ghost'
          aria-label='Close Exercise'
          onClick={() => exitAlert.current?.showPopover()}
        >
          <CloseIcon
            width={32}
            height={32}
          />
        </Button>
        <ProgressBar
          value={exerciseProgress}
          maxValue={exercises.length > 0 ? exercises.length : 100}
        />
      </div>
      <QuestionScreen
        number={exerciseProgress + 1}
        question={currentExercise.question}
        options={currentExercise.options}
        onSubmit={handleSubmit}
        selectedOption={selectedOption}
        onSelect={(index) => setSelectedOption(index)}
        hidden={isPending}
      />
      {isPending && <LoadingBuffer />}
      {finished && (
        <FinishingScreen
          currentRealm={realm}
          subjectId={subjectId}
          xpDelta={userXp.current}
        />
      )}
    </div>
  );
}

type QuestionProps = {
  number: number;
  question: string;
  options: string[];
  onSubmit: () => void;
  selectedOption: number;
  onSelect: (index: number) => void;
  hidden?: boolean;
};
function QuestionScreen({ number, question, options, onSubmit, selectedOption, onSelect, hidden }: QuestionProps) {
  return (
    <>
      <div
        className='flex flex-col gap-2 w-full p-4'
        hidden={hidden || undefined}
      >
        <h1 className='text-2xl font-bold'>Exercício #{number}</h1>
        <p className='text-lg font-medium '>{question}</p>
      </div>
      <div
        className='grid grid-cols-2 gap-8 justify-center grow'
        hidden={hidden || undefined}
      >
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === index ? 'default' : 'board'}
            onClick={() => onSelect(index)}
            className='h-full'
          >
            {option}
          </Button>
        ))}
      </div>
      <Button
        variant='outline'
        disabled={selectedOption === -1}
        onClick={onSubmit}
        hidden={hidden || undefined}
      >
        Confirmar
      </Button>
    </>
  );
}

function ProgressBar({ value, maxValue = 100, minValue = 0 }: { value: number; maxValue?: number; minValue?: number }) {
  return (
    <div className='rounded-full h-8 bg-neutral-300 overflow-hidden grow shrink-0'>
      <div
        className='bg-finished-100 h-full transition-[width] motion-reduce:transition-none duration-1000'
        style={{ width: ((value - minValue) / maxValue) * 100 + '%' }}
      ></div>
    </div>
  );
}

function WrongAnswerAlert({
  onActionPressed,
  explanation,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement> & { onActionPressed: () => void; explanation: string }) {
  return (
    <AlertBox {...props}>
      <AlertBoxHeader>
        <AlertBoxTitle>Não foi dessa vez :(</AlertBoxTitle>
        <AlertBoxDescription>
          Você não acertou essa questão, mas não desanime! Voçê pode sempre refazer esses exercícios e tentar de novo!
        </AlertBoxDescription>
        <AlertBoxDescription>{explanation}</AlertBoxDescription>
      </AlertBoxHeader>
      <AlertBoxFooter>
        <AlertBoxAction onClick={onActionPressed}>Continuar</AlertBoxAction>
      </AlertBoxFooter>
    </AlertBox>
  );
}

function RightAnswerAlert({
  onActionPressed,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement> & { onActionPressed: () => void }) {
  return (
    <AlertBox {...props}>
      <AlertBoxHeader>
        <AlertBoxTitle>Parabéns!</AlertBoxTitle>
        <AlertBoxDescription>Você acertou essa questão, agora vamos continuar!</AlertBoxDescription>
      </AlertBoxHeader>
      <AlertBoxFooter>
        <AlertBoxAction onClick={onActionPressed}>Continuar</AlertBoxAction>
      </AlertBoxFooter>
    </AlertBox>
  );
}

function ExitAlert({
  onCancelPressed,
  exitLink,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement> & { onCancelPressed: () => void; exitLink: string }) {
  return (
    <AlertBox {...props}>
      <AlertBoxHeader>
        <AlertBoxTitle>Tem certeza que quer sair?</AlertBoxTitle>
        <AlertBoxDescription>Seu progresso não será salvo!</AlertBoxDescription>
      </AlertBoxHeader>
      <AlertBoxFooter>
        <AlertBoxAction asChild>
          <Link href={exitLink}>Sim</Link>
        </AlertBoxAction>
        <AlertBoxCancel onClick={onCancelPressed}>Cancelar</AlertBoxCancel>
      </AlertBoxFooter>
    </AlertBox>
  );
}
