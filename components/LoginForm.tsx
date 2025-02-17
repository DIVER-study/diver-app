'use client';

import { signInWithPassword /*signUpWithPassword */ } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import ViewPasswordIcon from '@/components/svgs/ViewPasswordIcon';
import React, { useState } from 'react';
import Link from 'next/link';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.loading('Aguarde...', {
      dismissible: true,
      id: 'loading-toast',
    });

    const formData = new FormData(event.target as HTMLFormElement);

    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { data, error } = await signInWithPassword(userData);

    if (data || error) toast.dismiss('loading-toast');

    if (error) toast.error(`Erro: ${error.message}`);
    else {
      toast.success(`Boas Vindas! ${data.user.user_metadata.display_name || data.user.user_metadata.email}`);
      redirect('/');
    }
  };

  return (
    <form
      className="flex flex-col items-center mx-4"
      onSubmit={login}
    >
      <div id='title' className='flex flex-col items-start w-100 mb-4'>
        <h3 className="text-xl font-bold text-[#FD7401]">Olá de volta!</h3>
        <p className='text-lg font-medium' >Entre na sua conta!</p>
      </div>

      <div className='flex flex-col gap-7'>
        <div>
          <label
            htmlFor='email'
            className="text-sm text-[#555555] font-semibold font-medium flex flex-col items-start w-full pb-1"
          >
            Email Institucional:
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className="peer p-1.5 px-4 w-100 rounded-3xl ring-2 ring-black-500 focus:outline-none text-sm placeholder-[#555555]
                        peer-invalid:ring-red-500 peer-invalid:text-red-600"
            placeholder="exemplo@alu.ufc.br"
          />
        </div>
        
        <div className="relative">
          <label
            htmlFor='password'
            className="text-sm text-[#555555] font-semibold font-medium flex flex-col items-start w-full pb-1"
          >
            Senha:
          </label>
          <input
            id='password'
            name='password'
            type={showPassword ? "text" : "password"} 
            required
            className="p-1.5 px-4 w-100 rounded-3xl ring-2 ring-black-500 focus:outline-none text-sm pr-10"
            placeholder="(●__●)"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer mt-1"
          >
            <ViewPasswordIcon width={24} height={24} />
          </button>
        </div>
      </div>

      <Link 
        href='/reset-password'
        className="text-sm text-[#1E2772] underline underline-offset-1 hover:underline self-start pl-3 mt-7 mb-2"
      >
        Esqueceu sua senha?
      </Link>
      
      <div className="flex flex-col items-center justify-center gap-4 p-3">
        <button
          className="text-sm font-bold cursor-pointer p-2 w-100 text-white bg-[#FD7401] rounded-3xl hover:bg-[#FFFFFF] hover:text-[#FD7401] focus:outline-none border-2 focus:border-[#FD7401]"
          type="submit"
        >
          Login
        </button>

        <div className="flex items-center w-full justify-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="px-2 text-[#C2C2C2] text-xs">OU</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

          <Link 
            href='/register' 
            className="text-sm font-bold text-center cursor-pointer p-2 w-100 text-[#FD7401] bg-[#FFFFFF] rounded-3xl border-2 border-[#FD7401] hover:bg-[#FD7401] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FD7401] focus:border-[#FD7401]"
          >
            Cadastrar
          </Link>
      </div>
    </form>
  );
}
export default LoginForm;
