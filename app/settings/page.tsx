'use client';

import { SideBar } from '@/components/SideBar';
import { createClient } from '@/utils/supabase/client';
import React, { useState } from 'react';
import { toast } from 'sonner';

function UserSettings() {
  const supabase = createClient();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const updateDisplayName = async (formData: FormData) => {
    toast.loading('Aguarde...', { id: 'loading-toast' });

    const displayName = formData.get('display_name') as string;

    const { error: updateError } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });

    toast.dismiss('loading-toast');

    if (updateError) {
      toast.error(`Erro ao atualizar nome: ${updateError.message}`);
    } else {
      toast.success('Nome de usuário atualizado com sucesso!');
      document.getElementById('name-form')?.hidePopover();
    }
  };

  const updateProfilePicture = async () => {
    if (!profilePicture) return;

    toast.loading('Enviando imagem...', { id: 'loading-toast' });

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(`profiles/${profilePicture.name}`, profilePicture, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      toast.dismiss('loading-toast');
      toast.error(`Erro ao enviar imagem: ${uploadError.message}`);
      return;
    }

    const { data: publicURL } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(`profiles/${profilePicture.name}`);

    if (publicURL) {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicURL.publicUrl },
      });

      toast.dismiss('loading-toast');

      if (updateError) {
        toast.error(`Erro ao atualizar imagem: ${updateError.message}`);
      } else {
        toast.success('Foto de perfil atualizada com sucesso!');
        document.getElementById('photo-form')?.hidePopover();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProfilePicture(file);
  };

  return (
    <div className='flex h-screen'>
      {/* Popover para alteração de nome */}
      <div
        popover='manual'
        id='name-form'
        className='absolute left-1/2 top-1/2 ring-1 ring-neutral-600 p-4 -translate-x-1/2 -translate-y-1/2'
      >
        <form
          className='grid gap-4 grid-cols-2'
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            updateDisplayName(formData);
          }}
        >
          <label
            htmlFor='display_name'
            className='col-span-2'
          >
            Novo Nome de Usuário:
          </label>
          <input
            type='text'
            name='display_name'
            id='display_name'
            required
            className='ring-1 ring-neutral-600 p-2 col-span-2'
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-500/80 p-4'
          >
            Atualizar
          </button>
          <button
            type='button'
            className='ring-1 ring-neutral-500 hover:bg-neutral-400/80 p-4'
            popoverTarget='name-form'
            popoverTargetAction='hide'
          >
            Cancelar
          </button>
        </form>
      </div>
      {/* Popover para alteração de foto */}
      <div
        popover='manual'
        id='photo-form'
        className='absolute left-1/2 top-1/2 ring-1 ring-neutral-600 p-4 -translate-x-1/2 -translate-y-1/2'
      >
        <form
          className='grid gap-4 grid-cols-2'
          onSubmit={(e) => {
            e.preventDefault();
            updateProfilePicture();
          }}
        >
          <label
            htmlFor='profile_picture'
            className='col-span-2'
          >
            Nova Foto de Perfil:
          </label>
          <input
            type='file'
            id='profile_picture'
            accept='image/*'
            className='ring-1 ring-neutral-600 p-2 col-span-2'
            onChange={handleFileChange}
          />
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-500/80 p-4'
          >
            Atualizar
          </button>
          <button
            type='button'
            className='ring-1 ring-neutral-500 hover:bg-neutral-400/80 p-4'
            popoverTarget='photo-form'
            popoverTargetAction='hide'
          >
            Cancelar
          </button>
        </form>
      </div>
      <SideBar />
      <div className='p-4 space-y-4'>
        <button
          popoverTarget='name-form'
          popoverTargetAction='show'
          className='bg-blue-500 hover:bg-blue-500/80 p-4'
        >
          Alterar Nome de Usuário
        </button>
        <button
          popoverTarget='photo-form'
          popoverTargetAction='show'
          className='bg-green-500 hover:bg-green-500/80 p-4'
        >
          Alterar Foto de Perfil
        </button>
      </div>
    </div>
  );
}

export default UserSettings;
