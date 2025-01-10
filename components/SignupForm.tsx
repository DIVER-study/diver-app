'use client';

import { signUpWithPassword } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export default function SignupForm() {
  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.loading('Aguarde...', {
      dismissible: true,
      id: 'loading-toast',
    });

    const formData = new FormData(event.target as HTMLFormElement);

    /* TODO: validação se o email é institucional */
    /* TODO: validação do display_name */

    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      options: {
        data: {
          display_name: formData.get('display_name') as string,
          avatar_url: '',
        },
      },
    };

    const { error } = await signUpWithPassword(userData);

    toast.dismiss('loading-toast');

    if (error) {
      toast.error(`Erro: ${error.message}`);
      return;
    } else {
      toast.success(`Boas Vindas! Verifique sua caixa de email para confirmar seu login!`);
      redirect('/login');
    }
  };

  return (
    <form
      className='flex flex-col max-w-xs w-full mx-4 gap-4 p-6 bg-white/90 rounded-xl shadow-md ring-1 ring-neutral-500'
      onSubmit={signUp}
    >
      <label
        htmlFor='display_name'
        className='text-sm font-medium'
      >
        Nome de Usuário
      </label>
      <input
        id='display_name'
        name='display_name'
        type='text'
        required
        className='p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      <label
        htmlFor='email'
        className='text-sm font-medium'
      >
        Email:
      </label>
      <input
        id='email'
        name='email'
        type='email'
        required
        className='p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:ring-red-500 invalid:text-red-600 valid:valid:text-green-600 valid:ring-green-500'
      />

      <label
        htmlFor='password'
        className='text-sm font-medium'
      >
        Senha:
      </label>
      <input
        id='password'
        name='password'
        type='password'
        required
        className='p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:ring-red-500 invalid:text-red-600 valid:valid:text-green-600 valid:ring-green-500'
      />
      {/* TODO:confirmação de senha  */}
      <button
        className='p-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-600/80 focus:outline-none focus:ring-2 focus:ring-green-500'
        type='submit'
      >
        Cadstre-se
      </button>
    </form>
  );
}
