'use client';

import { signUpWithPassword } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import CheckMarkIcon from '@/components/svgs/CheckMarkIcon';
import ViewPasswordIcon from '@/components/svgs/ViewPasswordIcon';

export default function SignupForm() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.loading('Aguarde...', { dismissible: true, id: 'loading-toast' });

    const formData = new FormData(event.currentTarget);

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

    // Validação dos termos de uso
    if (!termsAccepted) {
      toast.error('Você deve aceitar os Termos de Uso antes de continuar.');
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

    try {
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
    } catch (err) {
      toast.dismiss('loading-toast');
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col items-center mx-4"
      onSubmit={signUp}
    >
      <div id='title' className='flex flex-col items-start w-100'>
        <h3 className="text-xl font-bold text-[#FD7401]">Bem-Vindo(a)!</h3>
        <p className='text-lg font-medium' >Crie sua conta</p>
      </div>
    <div className='flex flex-col gap-7'>
      <div className='mt-4'>
        <label htmlFor="display_name" className="text-sm text-[#555555] font-semibold font-medium flex flex-col items-start w-full pb-1">
          Nome de Usuário:
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          required
          placeholder='Digite seu nome de usuário'
          className="p-1.5 px-4 w-100 rounded-3xl ring-2 ring-black-500 focus:outline-none text-sm "
        />
      </div>
        
      <div>
        <label htmlFor="email" className="text-sm text-[#555555] font-semibold font-medium flex flex-col items-start w-full pb-1">
          Email Institucional:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="peer p-1.5 px-4 w-100 rounded-3xl ring-2 ring-black-500 focus:outline-none text-sm placeholder-[#555555]
                    peer-invalid:ring-red-500 peer-invalid:text-red-600"
          placeholder="exemplo@alu.ufc.br"
        />
      </div>

        
      <div className="relative">
        <label htmlFor="password" className="text-sm text-[#555555] font-semibold font-medium flex flex-col items-start w-full pb-1">
          Senha:
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"} 
          required
          className="p-1.5 px-4 w-100 rounded-3xl ring-2 ring-black-500 focus:outline-none text-sm pr-10"
          placeholder="(●__●)"
        />
        {/* Ícone de visualizar senha */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)} 
          className="absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer mt-1"
        >
          <ViewPasswordIcon width={24} height={24} />
        </button>
      </div>


    </div>

      
      {/* <label htmlFor="confirm_password" className="text-sm font-medium">
        Confirmar Senha:
      </label>
      <input
        id="confirm_password"
        name="confirm_password"
        type="password"
        required
        className="p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}

      {/* Checkbox dos Termos de Uso */}
      <div className="flex items-center gap-2 mt-8 mb-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="hidden"
          />
          <span className={`w-4 h-4 flex items-center justify-center border-2 border-orange-500 rounded-sm ${termsAccepted ? 'bg-[#FD7401]' : 'bg-white'}`}>
            {termsAccepted && <CheckMarkIcon width={80} height={80} className="text-white" />}
          </span>
          <a href="/termsOfUse" target="_blank" className="text-sm text-[#1E2772] underline underline-offset-1 hover:underline">
            Concordar com os Termos de Uso
          </a>
        </label>

      </div>

      <div className="flex flex-col items-center justify-center gap-4 p-3">
        <button
          className="text-sm font-bold cursor-pointer p-2 w-100 text-white bg-[#FD7401] rounded-3xl hover:bg-[#FFFFFF] hover:text-[#FD7401] focus:outline-none border-2 focus:border-[#FD7401]"
          type="submit"
        >
          Cadastrar
        </button>

        <div className="flex items-center w-full justify-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="px-2 text-[#C2C2C2] text-xs">OU</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

          <Link 
            href='/login' 
            className="text-sm font-bold text-center cursor-pointer p-2 w-100 text-[#FD7401] bg-[#FFFFFF] rounded-3xl border-2 border-[#FD7401] hover:bg-[#FD7401] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FD7401] focus:border-[#FD7401]"
          >
            Já tem conta?
          </Link>
      </div>
    </form>
  );
}
