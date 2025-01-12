'use client';

import React, { useTransition } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

const ResetPassword: React.FC = () => {
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    startTransition(async () => {
      if (newPassword !== confirmPassword) {
        toast.error('As senhas não são iguais');
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword!,
      });

      if (error) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.success('Senha alterada com sucesso!');
        redirect('/');
      }
    });
  };

  return (
    <div className='h-screen content-center'>
      <form
        onSubmit={handleSubmit}
        className='w-[400px] ring-1 ring-neutral-500 rounded-lg mx-auto p-2 space-y-2'
      >
        <h2 className='font-bold text-center'>Redefinir Senha</h2>
        <label htmlFor='new-password'>Nova Senha:</label>
        <input
          type='password'
          id='new-password'
          name='new-password'
          className='p-1 w-full ring-1 ring-neutral-500 rounded-md'
          required
        />
        <label htmlFor='confirm-password'>Confirmar Senha:</label>
        <input
          type='password'
          id='confirm-password'
          name='confirm-password'
          className='p-1 w-full ring-1 ring-neutral-500 rounded-md'
          required
        />
        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-blue-500 disabled:bg-neutral-500 disabled:opacity-90 text-white p-2 rounded-md'
        >
          {isPending ? 'Alterando...' : 'Alterar Senha'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

