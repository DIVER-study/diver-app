'use client';

import { signUpWithPassword } from '@/app/login/actions';
import React from 'react';
import { toast } from 'sonner';

export default function SignupForm() {
  const signUp = async (formData: FormData) => {
    toast.loading('Aguarde...', {
      dismissible: true,
      id: 'loading-toast',
    });

    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      display_name: formData.get('display_name') as string,
      avatar_url: '',
    };

    /* TODO: validação se o email é institucional
     * exemplo:
     * if (!userData.email.endsWith('@alu.ufc.br'){
     *   toast.error('Email inválido! Utilize seu email institucional da ufc');
     *   toast.dismiss('loading-toast')
     *   return;
     *  }
     */

    const { error } = await signUpWithPassword(userData);

    toast.dismiss('loading-toast');

    if (error) {
      toast.error(`Erro: ${error.message}`);
      return;
    } else {
      toast.success(`Boas Vindas! Verifique sua caixa de email para confirmar seu login!`);
    }
  };

  return (
    <form className='flex flex-col max-w-xs w-full mx-4 gap-4 p-6 bg-white/90 rounded-xl shadow-md ring-1 ring-neutral-500'>
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
      {/* <label htmlFor="password" className="text-sm font-medium"> */}
      {/*   Confirmar Senha: */}
      {/* </label> */}
      {/* <input */}
      {/*   id="password" */}
      {/*   name="password" */}
      {/*   type="password" */}
      {/*   required */}
      {/*   className="p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:ring-red-500 invalid:text-red-600 valid:valid:text-green-600 valid:ring-green-500" */}
      {/* /> */}

      <button
        formAction={signUp}
        className='p-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-600/80 focus:outline-none focus:ring-2 focus:ring-green-500'
      >
        Cadstre-se
      </button>
    </form>
  );
}
