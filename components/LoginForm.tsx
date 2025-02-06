'use client';

import { signInWithPassword /*signUpWithPassword */ } from '@/app/login/actions';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

function LoginForm() {
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
      className='flex flex-col max-w-xs w-full mx-4 gap-4 p-6 bg-white/90 rounded-xl shadow-md ring-1 ring-neutral-500'
      onSubmit={login}
    >
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
        className='p-2 rounded-md bg-neutral-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500'
      />

      <label
        htmlFor='password'
        className='text-sm font-medium'
      >
        Password:
      </label>
      <input
        id='password'
        name='password'
        type='password'
        required
        className='p-2 rounded-md bg-neutral-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500'
      />

      <button
        className='p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500'
        type='submit'
      >
        Log in
      </button>
    </form>
  );
}
export default LoginForm;
