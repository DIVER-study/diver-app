'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ConfirmAnswerIcon, ExitButtonIcon } from '@/components/Svgs';
import { AlertConfirm, AlertRightAnswer, AlertWrongAnswer } from '@/components/Alerts';
import {PopUpXp} from '@/components/PopUpXp'
import { redirect, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { UserStore } from '@/components/UserStore';
import { Database } from '@/database.types';
import { createClient } from '@/utils/supabase/client';

type ExerciseType = {
  answer: number;
  explanation: string;
  options: string[];
  question: string;
};

export default function ExercisePage({ params }: { params: Promise<{ realm: string }> }) {
  const searchParams = useSearchParams();
  const moduleId = Number(searchParams.get('moduleId'));
  const subjectId = Number(searchParams.get('temaId'));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [currentRealm, setCurrentRealm] = useState<Database['public']['Enums']['realms']>('behaviorism');
  const [showAlertExit, setShowAlertExit] = useState(false);
  const [showAlertCertaResposta, setShowAlertCertaResposta] = useState(false);
  const [showAlertRespostaErrada, setShowAlertRespostaErrada] = useState(false);
  const { user, updateUserProgress } = useUserStore();
  const [questions, setQuestions] = useState<ExerciseType[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [showPopUpXp, setShowPopUpXp] = useState(false);

  const handleAnswer = (option: number) => {
    setSelectedAnswer(option);
  };

  const handleConfirm = () => {
    if (!selectedAnswer) return;
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedAnswer === correctAnswer) {
      setShowAlertCertaResposta(true);
    } else {
      setShowAlertRespostaErrada(true);
    }
    setProgress((prevProgress) => Math.min(prevProgress + 100 / questions.length, 100));
    // Limpa a resposta selecionada para a próxima questão
    setSelectedAnswer(-1);
  };

  const handleGoToNextQuestion = async () => {
    setShowAlertCertaResposta(false);
    setShowAlertRespostaErrada(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Trigger Fim das Perguntas
        setPending(true);
        const currentUserProgress = user.progress[currentRealm];
        await updateUserProgress({ [currentRealm]: currentUserProgress + 1 });
        setPending(false);
        setShowPopUpXp(true);
    }
  };

  const handleCancelExit = () => {
    setShowAlertExit(false);
  };

  useEffect(() => {
    const grabParameters = async () => {
      const { realm } = await params;
      if (realm) setCurrentRealm(realm as Database['public']['Enums']['realms']);
    };
    grabParameters();
    const grabQuestions = async () => {
      if (!moduleId) return;
      const supabase = createClient();
      const { data } = await supabase
        .from('exercises')
        .select('answer, explanation, options, question')
        .eq('module_id', moduleId);
      if (data) {
        setQuestions(data);
        setPending(false);
      }
    };
    grabQuestions();
  }, [moduleId, params]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white-100 p-10'>
      {(showAlertCertaResposta || showAlertRespostaErrada || showAlertExit) && (
        <div className='absolute inset-0 bg-white opacity-60 backdrop-blur-sm z-40 content-center'></div>
      )}

      <div
        hidden={!pending}
        className='absolute inset-0 bg-white z-40 content-center'
      >
        <div className='size-20 bg-gradient-to-r from-black to-neutral-500 animate-spin rounded-full mx-auto'></div>
      </div>
      <UserStore />
      <div className='flex items-center justify-center w-full pl-0 gap-2 mr-[15%]'>
        {/* Botão de saída */}
        <button
          onClick={() => setShowAlertExit(true)}
          className='mr-[15%]'
        >
          <ExitButtonIcon
            width={40}
            height={40}
          />
        </button>

        {showAlertExit && (
          <AlertConfirm
            message='TEM CERTEZA?'
            action={handleCancelExit}
          />
        )}
        {/* Barra de progresso */}
        <div className='w-[60%] bg-white border-2 border-black rounded-full h-5'>
          <div
            className='bg-black h-4 rounded-full'
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='text-sm text-gray-600'>{Math.round(progress)}%</p>
      </div>

      {questions[currentQuestion] && (
        <div className='flex items-start gap-4 mb-4 mt-[4rem]'>
          <div className='flex flex-col mt-10 mr-8'>
            {/* Pergunta */}
            <h2 className='text-3xl font-bold text-left mb-4'>Exercício {currentQuestion + 1}</h2>

            <p className='text-sm text-black text-left mb-10'>{questions[currentQuestion].question}</p>

            {/* Opções de resposta */}
            <div className='grid grid-cols-2 gap-2'>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  data-selected={selectedAnswer === index}
                  className='p-2 w-full text-left border-2 border-black rounded-md shadow-[4px_4px_4px_rgba(0,0,0,0.6)] hover:shadow-[6px_6px_6px_rgba(0,0,0,0.7)] bg-white text-black data-[selected=true]:text-white data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-500'
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-end'>
            {/*imagem */}
            <div className='relative w-[18rem] h-[20rem] border rounded-lg overflow-hidden mt-[4.5rem]'>
              <Image
                src='/chad-freddy.webp'
                alt='Descrição da imagem'
                fill
                sizes='100%'
                className='w-full h-full object-cover'
                priority
              />
            </div>

            {/* Botões de navegação */}
            <div className='flex mt-4'>
              <button
                onClick={handleConfirm}
                disabled={selectedAnswer === -1}
                className='px-8 py-[12px] bg-white-500 text-white rounded-md disabled:bg-white-300 border-2 border-black shadow-[4px_4px_4px_rgba(0,0,0,0.6)] hover:shadow-[6px_6px_6px_rgba(0,0,0,0.7)'
              >
                <ConfirmAnswerIcon
                  width={26}
                  height={20}
                />
              </button>

              {/* Alerts */}
              {showAlertCertaResposta && (
                <AlertRightAnswer
                  message='CERTA RESPOSTA :)'
                  action={handleGoToNextQuestion}
                />
              )}

              {showAlertRespostaErrada && (
                <AlertWrongAnswer
                  message='RESPOSTA ERRADA :('
                  explanation={questions[currentQuestion].explanation}
                  action={handleGoToNextQuestion}
                />
              )}
              {showPopUpXp && (
                <PopUpXp currentRealm={currentRealm} subjectId={subjectId}
                
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
