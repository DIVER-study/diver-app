'use client';

import { signInWithPassword, signUpWithPassword } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

function LoginForm() {
  const login = async (formData: FormData) => {
    toast.loading('Entrando...', {
      dismissible: true,
      id: 'loading-toast',
    });

    const { data, error } = await signInWithPassword(formData);

    if (data || error) toast.dismiss('loading-toast');

    if (error) toast.error(`Erro: ${error.message}`);
    else {
      toast.success(`Boas Vindas! ${data.user.user_metadata.email}`);
      redirect('/');
    }
  };

  const signup = async (formData: FormData) => {
    toast.loading('Cadastrando...', {
      dismissible: true,
      id: 'loading-toast',
    });

    const { data, error } = await signUpWithPassword(formData);

    if (data || error) toast.dismiss('loading-toast');

    if (error) toast.error(`Erro: ${error.message}`);
    else
      toast.success(
        `Boas Vindas! ${data.user?.user_metadata.email}. Verifique sua caixa de email para confirmar seu login!`
      );
  };

  return (
    <form className='flex flex-col max-w-xs w-full mx-4 gap-4 p-6 bg-white/90 rounded-xl shadow-md ring-1 ring-neutral-500'>
      <label
        htmlFor='email'
        className='text-sm font-medium'>
        Email:
      </label>
      <input
        id='email'
        name='email'
        type='email'
        required
        className='p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      <label
        htmlFor='password'
        className='text-sm font-medium'>
        Password:
      </label>
      <input
        id='password'
        name='password'
        type='password'
        required
        className='p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      <button
        formAction={login}
        className='p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
        Log in
      </button>

      <button
        formAction={signup}
        className='p-2 mt-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
        Sign Up
      </button>
    </form>
  );
}
export default LoginForm;
