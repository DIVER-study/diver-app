'use client';

import React, { useTransition } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const email = formData.get('email') as string;

      // Enviar o e-mail com o link de redefinição de senha
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}new-password`,
      });

      if (error) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.success('Enviamos um link para sua caixa de email!');
      }
    });
  };

  return (
    <div className='max-w-[400px] mx-auto p-4 ring-1 ring-neutral-500 rounded-md'>
      <h2 className='font-bold text-center'>Redefinir Senha</h2>
      <form
        onSubmit={handleResetPassword}
        className='flex gap-2 flex-col'
      >
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          name='email'
          className='ring-1 ring-neutral-500'
          required
        />
        <button
          type='submit'
          disabled={isPending}
          className='bg-blue-500 hover:bg-blue-500/80 disabled:bg-neutral-500 disabled:opacity-90 p-4 rounded-lg'
        >
          {isPending ? 'Carregando...' : 'Enviar Link de Redefinição'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
