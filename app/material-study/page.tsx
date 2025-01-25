'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type StudyMaterialItem =
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
    }
  | {
      type: 'video';
      src: string;
      title: string;
    }
  | {
      type: 'button';
      label: string;
      onClick: () => void;
    }
  | {
      type: 'imageWithText';
      src: string;
      alt: string;
      content: string;
    };

type StudyMaterialSection = {
  type: 'section';
  content: StudyMaterialItem[];
};

export default function StudyMaterialPage() {
  const router = useRouter();

  const studyMaterials: StudyMaterialSection[] = [
    {
      type: 'section',
      content: [
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet. Sit iusto iusto est vero atque et tempora rerum et dolore corrupti et voluptatem culpa id quam voluptatem ut officiis necessitatibus. Qui sapiente fugiat aut quas temporibus et incidunt corporis sed accusamus consequuntur. Sed nemo atque qui maxime facilis qui perspiciatis reiciendis non omnis velit ab magnam tempore. Et possimus mollitia eum nobis commodi et voluptas impedit eum autem labore ut exercitationem nisi est unde accusantium eum enim eaque. Et voluptatum ipsum ut quam neque qui voluptatum ipsum et voluptates aliquid.',
        },
        {
          type: 'imageWithText',
          src: '/chad-freddy.webp',
          alt: 'Exemplo de princípios da Gestalt',
          content:
            'Lorem ipsum dolor sit amet. Sit iusto iusto est vero atque et tempora rerum et dolore corrupti et voluptatem culpa id quam voluptatem ut officiis necessitatibus. Qui sapiente fugiat aut quas temporibus et incidunt corporis sed accusamus consequuntur. Sed nemo atque qui maxime facilis qui perspiciatis reiciendis non omnis velit ab magnam tempore. Et possimus mollitia eum nobis commodi et voluptas impedit eum autem labore ut exercitationem nisi est unde accusantium eum enim eaque. Et voluptatum ipsum ut quam neque qui voluptatum ipsum et voluptates aliquid.',
        },
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet. Sit iusto iusto est vero atque et tempora rerum et dolore corrupti et voluptatem culpa id quam voluptatem ut officiis necessitatibus. Qui sapiente fugiat aut quas temporibus et incidunt corporis sed accusamus consequuntur. Sed nemo atque qui maxime facilis qui perspiciatis reiciendis non omnis velit ab magnam tempore. Et possimus mollitia eum nobis commodi et voluptas impedit eum autem labore ut exercitationem nisi est unde accusantium eum enim eaque. Et voluptatum ipsum ut quam neque qui voluptatum ipsum et voluptates aliquid.',
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'text',
          content:
            'De origem alemã, a palavra gestalt, por definição, refere-se à forma de algo. Ela sugere que o todo é maior que a soma de suas partes.',
        },
        {
          type: 'video',
          src: 'https://www.youtube.com/embed/8kQfT9k1Fuw?t=234',
          title: 'Introdução à Teoria da Gestalt',
        },
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet. Sit iusto iusto est vero atque et tempora rerum et dolore corrupti et voluptatem culpa id quam voluptatem ut officiis necessitatibus. Qui sapiente fugiat aut quas temporibus et incidunt corporis sed accusamus consequuntur. Sed nemo atque qui maxime facilis qui perspiciatis reiciendis non omnis velit ab magnam tempore. Et possimus mollitia eum nobis commodi et voluptas impedit eum autem labore ut exercitationem nisi est unde accusantium eum enim eaque. Et voluptatum ipsum ut quam neque qui voluptatum ipsum et voluptates aliquid.',
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet. Sit iusto iusto est vero atque et tempora rerum et dolore corrupti et voluptatem culpa id quam voluptatem ut officiis necessitatibus. Qui sapiente fugiat aut quas temporibus et incidunt corporis sed accusamus consequuntur. Sed nemo atque qui maxime facilis qui perspiciatis reiciendis non omnis velit ab magnam tempore. Et possimus mollitia eum nobis commodi et voluptas impedit eum autem labore ut exercitationem nisi est unde accusantium eum enim eaque. Et voluptatum ipsum ut quam neque qui voluptatum ipsum et voluptates aliquid.',
        },
        {
          type: 'image',
          src: '/chad-freddy.webp',
          alt: 'Exemplo de princípios da Gestalt',
        },
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet. Sit iusto iusto est vero atque et tempora rerum et dolore corrupti et voluptatem culpa id quam voluptatem ut officiis necessitatibus. Qui sapiente fugiat aut quas temporibus et incidunt corporis sed accusamus consequuntur. Sed nemo atque qui maxime facilis qui perspiciatis reiciendis non omnis velit ab magnam tempore. Et possimus mollitia eum nobis commodi et voluptas impedit eum autem labore ut exercitationem nisi est unde accusantium eum enim eaque. Et voluptatum ipsum ut quam neque qui voluptatum ipsum et voluptates aliquid.',
        },
        {
          type: 'text',
          content: 'Parabéns pelo fim dos estudos! :)',
        },
      ],
    },
    {
      type: 'section',
      content: [
        {
          type: 'text',
          content:
            'Lorem ipsum dolor sit amet. Sit iusto iusto est vero atque et tempora rerum et dolore corrupti et voluptatem culpa id quam voluptatem ut officiis necessitatibus. Qui sapiente fugiat aut quas temporibus et incidunt corporis sed accusamus consequuntur. Sed nemo atque qui maxime facilis qui perspiciatis reiciendis non omnis velit ab magnam tempore. Et possimus mollitia eum nobis commodi et voluptas impedit eum autem labore ut exercitationem nisi est unde accusantium eum enim eaque. Et voluptatum ipsum ut quam neque qui voluptatum ipsum et voluptates aliquid.',
        },
        {
          type: 'button',
          label: 'Voltar ao Início',
          onClick: () => router.back(),
        },
      ],
    },
  ];

  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  const progress = ((currentMaterialIndex + 1) / studyMaterials.length) * 100;

  const handleNext = () => {
    if (currentMaterialIndex < studyMaterials.length - 1) {
      setCurrentMaterialIndex(currentMaterialIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMaterialIndex > 0) {
      setCurrentMaterialIndex(currentMaterialIndex - 1);
    }
  };

  const currentMaterial = studyMaterials[currentMaterialIndex];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10'>
      {/* Botão de voltar */}
      <button
        onClick={() => router.back()}
        className='absolute top-4 left-4 flex items-center gap-2'
      >
        Voltar
      </button>

      <h1 className='text-4xl font-bold mb-8'>Material de Estudos</h1>

      {/* Barra de progresso */}
      <div className='w-[60%] bg-gray-200 border-2 border-black rounded-full h-5'>
        <div
          className='bg-black h-4 rounded-full'
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className='text-sm text-gray-600'>{Math.round(progress)}%</p>

      <div className='flex flex-col gap-6 w-full max-w-4xl mt-4'>
        {currentMaterial.type === 'section' &&
          currentMaterial.content.map((item, index) => {
            if (item.type === 'image') {
              return (
                <div
                  key={index}
                  className='relative w-full h-80 border rounded-lg overflow-hidden mb-6'
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes='100%'
                    className='w-full h-full object-cover'
                    priority
                  />
                </div>
              );
            }
            if (item.type === 'text') {
              return (
                <p key={index} className='text-lg text-black leading-relaxed'>
                  {item.content}
                </p>
              );
            }
            if (item.type === 'video') {
              return (
                <div key={index} className='w-full aspect-video'>
                  <iframe
                    width='100%'
                    height='100%'
                    src={item.src}
                    title={item.title}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
              );
            }
            if (item.type === 'button') {
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className='border-2 border-black p-1 rounded-md uppercase text-md'
                >
                  {item.label}
                </button>
              );
            }
            if (item.type === 'imageWithText') {
              return (
                <div key={index} className='flex items-center gap-4'>
                  <div className='w-1/2'>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className='rounded-lg object-cover'
                    />
                  </div>
                  <div className='w-1/2'>
                    <p className='text-lg text-black leading-relaxed'>
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>

      {/* Navegação */}
      <div className='flex justify-between w-full max-w-4xl mt-8'>
        <button
          onClick={handlePrevious}
          disabled={currentMaterialIndex === 0}
          className='border-2 border-black p-1 rounded-md uppercase text-md'
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentMaterialIndex === studyMaterials.length - 1}
          className='border-2 border-black p-1 rounded-md uppercase text-md'
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
