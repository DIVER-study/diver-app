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

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    const displayName = formData.get('display_name') as string;

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validação do email institucional
    if (!email.endsWith('@alu.ufc.br')) {
      toast.error('Utilize um email institucional da UFC (@alu.ufc.br)');
      toast.dismiss('loading-toast');
      return;
    }

    // Validação do nome de usuário
    if (!displayName || displayName.length < 3) {
      toast.error('O nome de usuário deve ter pelo menos 3 caracteres.');
      toast.dismiss('loading-toast');
      return;
    }

    // Validação da senha e confirmação
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      toast.dismiss('loading-toast');
      return;
    }

    const userData = {
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          avatar_url: '',
        },
      },
    };

    const { error } = await signUpWithPassword(userData);

    toast.dismiss('loading-toast');

    if (error) {
      toast.error(`Erro: ${error.message}`);
    } else {
      toast.success('Boas Vindas! Verifique sua caixa de email para confirmar seu login!');
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
        Nome de Usuário:
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

      <label
        htmlFor='confirm_password'
        className='text-sm font-medium'
      >
        Confirmar Senha:
      </label>
      <input
        id='confirm_password'
        name='confirm_password'
        type='password'
        required
        className='p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:ring-red-500 invalid:text-red-600 valid:valid:text-green-600 valid:ring-green-500'
      />

      <button
        className='p-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-600/80 focus:outline-none focus:ring-2 focus:ring-green-500'
        type='submit'
      >
        Cadastre-se
      </button>
    </form>
  );
}
