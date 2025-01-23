'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ConfirmAnswerIcon, ExitButtonIcon } from '@/components/Svgs';
import { AlertConfirm, AlertRightAnswer, AlertWrongAnswer } from '@/components/Alerts';

export default function ExercisePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAlertExit, setShowAlertExit] = useState(false);
  const [showAlertCertaResposta, setShowAlertCertaResposta] = useState(false);
  const [showAlertRespostaErrada, setShowAlertRespostaErrada] = useState(false);

  const questions = [
    {
      question: 'O que é gestalt?',
      options: {
        a: 'Uma teoria da psicologia',
        b: 'Deus',
        c: 'Uma praia do México',
        d: 'Um pintor',
      },
      answer: 'a',
      explanation:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus cumque eveniet ratione non? Omnis ex minus, perferendis voluptas at corrupti commodi reiciendis aut! Corrupti voluptates sed nihil quaerat iusto odit!',
    },
    {
      question: 'Qual é o princípio da Gestalt que afirma que elementos próximos tendem a ser vistos como um grupo?',
      options: {
        a: 'Pregnância',
        b: 'Continuidade',
        c: 'Proximidade',
        d: 'Similaridade',
      },
      answer: 'c',
      explanation:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus cumque eveniet ratione non? Omnis ex minus, perferendis voluptas at corrupti commodi reiciendis aut! Corrupti voluptates sed nihil quaerat iusto odit!',
    },
    {
      question: 'O princípio da continuidade da Gestalt afirma que:',
      options: {
        a: 'Linhas ou formas são vistas como contínuas, mesmo quando interrompidas.',
        b: 'Elementos próximos tendem a ser agrupados.',
        c: 'Elementos diferentes são percebidos como parte do mesmo todo.',
        d: 'O fundo e a figura são sempre percebidos de forma intercambiável.',
      },
      answer: 'a',
      explanation:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus cumque eveniet ratione non? Omnis ex minus, perferendis voluptas at corrupti commodi reiciendis aut! Corrupti voluptates sed nihil quaerat iusto odit!',
    },
  ];

  const handleAnswer = (option: string) => {
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
    setSelectedAnswer(null);
  };

  const handleGoToNextQuestion = () => {
    setShowAlertCertaResposta(false);
    setShowAlertRespostaErrada(false);
    setCurrentQuestion((currentQuestion + 1) % questions.length);
  };

  const handleCancelExit = () => {
    setShowAlertExit(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white-100 p-10'>
      {(showAlertCertaResposta || showAlertRespostaErrada || showAlertExit) && (
        <div className='absolute inset-0 bg-white opacity-60 backdrop-blur-sm z-40'></div>
      )}
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

      <div className='flex items-start gap-4 mb-4 mt-[4rem]'>
        <div className='flex flex-col mt-10 mr-8'>
          {/* Pergunta */}
          <h2 className='text-3xl font-bold text-left mb-4'>Exercício {currentQuestion + 1}</h2>

          <p className='text-sm text-black text-left mb-10'>{questions[currentQuestion].question}</p>

          {/* Opções de resposta */}
          <div className='grid grid-cols-2 gap-2'>
            {Object.entries(questions[currentQuestion].options).map(([key, option]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                data-selected={selectedAnswer === key}
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
            />
          </div>

          {/* Botões de navegação */}
          <div className='flex mt-4'>
            <button
              onClick={handleConfirm}
              disabled={!selectedAnswer}
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
          </div>
        </div>
      </div>
    </div>
  );
}
