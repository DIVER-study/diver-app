'use client';

import { SideBar } from '@/components/SideBar';
import { createClient } from '@/utils/supabase/client';
import { removeImage, uploadImage } from '@/utils/supabase/storage/client';
import React, { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

function UserSettings() {
  const supabase = createClient();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const updateDisplayName = async (formData: FormData) => {
    toast.loading('Aguarde...', { id: 'loading-toast' });

    const displayName = formData.get('display_name') as string;

    // TODO: Validação de nome de usuário.

    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });

    toast.dismiss('loading-toast');

    if (error) {
      toast.error(`Erro ao atualizar nome: ${error.message}`);
    } else {
      toast.success('Nome de usuário atualizado com sucesso!');
      document.getElementById('name-form')?.hidePopover();
    }
  };

  const handleUploadedImage = () => {
    toast.loading('Enviando imagem...', { id: 'loading-toast' });
    startTransition(async () => {
      const errorMessages = [];
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      const { data: oldData } = await supabase.from('profiles').select('avatar_url').eq('id', userId!);
      const oldImageUrl = oldData![0].avatar_url;
      const oldImagePath = oldImageUrl
        .slice(oldImageUrl.lastIndexOf('profile-pictures/'))
        .replace('profile-pictures/', '');

      const { error: removeError } = await removeImage({
        bucket: 'profile-pictures',
        imagePaths: [oldImagePath],
      });

      if (removeError) errorMessages.push(removeError.message);

      const { imageURL, error: uploadError } = await uploadImage({
        file: uploadedImage!,
        bucket: 'profile-pictures',
        folder: 'profiles',
      });

      toast.dismiss('loading-toast');

      if (uploadError) errorMessages.push(uploadError.message);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: imageURL },
      });

      if (updateError) errorMessages.push(updateError.message);

      toast.dismiss('loading-toast');

      if (errorMessages.length > 0) {
        errorMessages.forEach((msg) => toast.error(`Erro: ${msg}`));
      } else {
        toast.success('Foto de perfil atualizada com sucesso!');
        document.getElementById('photo-form')?.hidePopover();
      }

      setUploadedImage(null);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadedImage(file);
  };

  return (
    <div className='flex h-screen'>
      {/* Popover para alteração de nome */}
      <div
        popover='manual'
        id='name-form'
        className='absolute left-1/2 top-1/2 ring-1 ring-neutral-600 p-4 -translate-x-1/2 -translate-y-1/2 hidden [&:popover-open]:block'
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
            disabled={isPending}
          >
            Atualizar
          </button>
          <button
            type='button'
            className='ring-1 ring-neutral-500 hover:bg-neutral-400/80 p-4'
            popoverTarget='name-form'
            popoverTargetAction='hide'
            disabled={isPending}
          >
            Cancelar
          </button>
        </form>
      </div>
      {/* Popover para alteração de foto */}
      <div
        popover='manual'
        id='photo-form'
        className='absolute left-1/2 top-1/2 ring-1 ring-neutral-600 p-4 -translate-x-1/2 -translate-y-1/2 hidden [&:popover-open]:block'
      >
        <form
          className='grid gap-4 grid-cols-2'
          onSubmit={(e) => {
            e.preventDefault();
            handleUploadedImage();
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
            ref={imageInputRef}
            hidden
            onChange={handleFileChange}
          />
          <button
            disabled={isPending}
            type='button'
            className='ring-1 ring-neutral-500 p-2 text-center col-span-2 hover:bg-neutral-500/80'
            onClick={() => imageInputRef.current?.click()}
          >
            Selecionar imagens
          </button>
          <button
            type='submit'
            disabled={isPending}
            className='bg-green-500 hover:bg-green-500/80 p-4'
          >
            Atualizar
          </button>
          <button
            type='button'
            className='ring-1 ring-neutral-500 hover:bg-neutral-400/80 p-4'
            popoverTarget='photo-form'
            disabled={isPending}
            popoverTargetAction='hide'
          >
            Cancelar
          </button>
        </form>
      </div>
      <SideBar activeTab='perfil' />
      <main className='p-4 space-x-4 flex-1'>
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
      </main>
    </div>
  );
}

export default UserSettings;
