'use client';

import { SideBar } from '@/components/SideBar';
import { createClient } from '@/utils/supabase/client';
// import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

function UserSettings() {
  const supabase = createClient();

  const changeDisplayName = async (formData: FormData) => {
    toast.loading('Aguarde...', {
      dismissible: true,
      id: 'loading-toast',
    });
    const newUserData = {
      data: {
        display_name: formData.get('display_name'),
      },
    };
    const { error } = await supabase.auth.updateUser(newUserData);

    toast.dismiss('loading-toast');

    if (error) {
      toast.error(`Erro: ${error.message}`);
    } else {
      toast.success('Nome de usuário modificado com sucesso!');
      const popover = document.getElementById('change-form');
      popover?.hidePopover();
    }
  };

  return (
    <div className='flex h-screen'>
      <div
        popover='manual'
        id='change-form'
        className='absolute left-1/2 top-1/2 ring-1 ring-neutral-600 p-4 -translate-x-1/2 -translate-y-1/2'
      >
        <form className='grid gap-2 grid-cols-2'>
          <label
            htmlFor='display_name'
            className='col-span-2'
          >
            Novo Nome de Usuário:
          </label>
          <input
            type='text'
            name='display_name'
            required
            id='display_name'
            className='ring-1 ring-neutral-600 col-span-2'
          />
          <button
            formAction={changeDisplayName}
            className='bg-blue-500 hover:bg-blue-500/80 p-4'
          >
            Atualizar
          </button>
          <button
            popoverTarget='change-form'
            popoverTargetAction='hide'
            className='ring-1 ring-neutral-500 hover:bg-neutral-400/80 hover:ring-neutral-400 p-4'
            type='button'
          >
            Cancelar
          </button>
        </form>
      </div>
      <SideBar />
      <div className='p-4'>
        <button
          popoverTarget='change-form'
          popoverTargetAction='show'
          className='bg-blue-500 hover:bg-blue-500/80 p-4'
        >
          Mudar nome de usuário
        </button>
      </div>
    </div>
  );
}

export default UserSettings;
