'use client';

import { signUpWithPassword } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import CheckMarkIcon from '@/components/svgs/CheckMarkIcon';
import ViewPasswordIcon from '@/components/svgs/ViewPasswordIcon';
import { TermsOfUse } from '@/components/TermsOfUse';
import { Button } from './ui/Button';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const termsOfUse = useRef<HTMLDivElement>(null);

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.loading('Aguarde...', { dismissible: true, id: 'loading-toast' });

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    const displayName = formData.get('display_name') as string;
    const terms = formData.get('terms') as string;

    // Validação do email institucional
    if (!email.endsWith('@alu.ufc.br')) {
      toast.error('Utilize um email institucional da UFC (@alu.ufc.br)');
      toast.dismiss('loading-toast');
      return;
    }

    // Validação dos termos de uso
    if (terms !== 'on') {
      toast.dismiss('loading-toast');
      toast.error('Você deve aceitar os Termos de Uso antes de continuar.');
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

    const { error } = await signUpWithPassword({
      email,
      password,
      options: {
        data: { display_name: displayName, avatar_url: '' },
      },
    });

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
      className='flex flex-col items-center mx-4'
      onSubmit={signUp}
    >
      <div
        id='title'
        className='flex flex-col items-start w-100'
      >
        <h3 className='text-xl font-bold text-logo-200'>Boas-Vindas!</h3>
        <p className='text-lg font-medium'>Crie sua conta</p>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='mt-4'>
          <label
            htmlFor='display_name'
            className='text-sm text-neutral-500 font-medium flex flex-col items-start w-full pb-1'
          >
            Nome de Usuário:
          </label>
          <input
            id='display_name'
            name='display_name'
            type='text'
            required
            placeholder='Digite seu nome de usuário'
            className='p-1.5 px-4 w-100 rounded-3xl ring-2 ring-black-500 focus:outline-none text-sm '
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='text-sm text-neutral-500 font-medium flex flex-col items-start w-full pb-1 peer-invalid/email:ring-warning peer-invalid/email:text-warning'
          >
            Email Institucional:
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className='peer/email p-1.5 px-4 w-100 rounded-3xl ring-2 ring-neutral-500 focus:outline-none text-sm placeholder-neutral-500 invalid:ring-warning invalid:text-warning'
            placeholder='exemplo@alu.ufc.br'
          />
        </div>

        <div className='relative'>
          <label
            htmlFor='password'
            className='text-sm text-neutral-500 font-medium flex flex-col items-start w-full pb-1'
          >
            Senha:
          </label>
          <input
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            required
            className='p-1.5 px-4 w-100 rounded-3xl ring-2 ring-neutral-500 focus:outline-none text-sm pr-10'
            placeholder='●●●●●●'
          />
          {/* Ícone de visualizar senha */}
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer mt-1'
          >
            <ViewPasswordIcon
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className='relative'>
          <label
            htmlFor='confirm-password'
            className='text-sm text-neutral-500 font-medium flex flex-col items-start w-full pb-1'
          >
            Cofirme sua Senha:
          </label>
          <input
            id='confirm-password'
            name='confirm-password'
            type={showPassword ? 'text' : 'password'}
            required
            className='p-1.5 px-4 w-100 rounded-3xl ring-2 ring-neutral-500 focus:outline-none text-sm pr-10'
            placeholder='●●●●●●'
          />
          {/* Ícone de visualizar senha */}
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer mt-1'
          >
            <ViewPasswordIcon
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      {/* Checkbox dos Termos de Uso */}
      <div className='flex items-center gap-2 mt-8 mb-3'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            id='terms'
            name='terms'
            type='checkbox'
            className='hidden peer/check'
          />
          <span className='w-4 h-4 flex items-center justify-center border-2 border-logo-200 rounded-sm peer-checked/check:bg-logo-200 bg-white'>
            <CheckMarkIcon
              width={80}
              height={80}
              className='text-white hidden peer-checked/check:block'
            />
          </span>
          <a
            onClick={(e) => e.preventDefault()}
            target='_blank'
            popoverTarget='terms-of-use'
            popoverTargetAction='show'
            className='text-sm text-[#1E2772] underline underline-offset-1'
          >
            Concordar com os Termos de Uso
          </a>
        </label>
      </div>

      <div className='flex flex-col items-center justify-center gap-4 p-3'>
        <Button type='submit'>Cadastrar</Button>

        <div className='flex items-center w-full justify-center'>
          <div className='flex-grow border-t border-gray-400'></div>
          <span className='px-2 text-gray-400 text-xs'>OU</span>
          <div className='flex-grow border-t border-gray-400'></div>
        </div>

        <Button
          variant='outline'
          asChild
        >
          <Link href='/login'>Já tem conta?</Link>
        </Button>
      </div>

      <TermsOfUse
        action={() => termsOfUse.current?.hidePopover()}
        popover='manual'
      />
    </form>
  );
}
