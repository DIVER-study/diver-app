'use client';

import { toast } from 'sonner';
import { updateUserNameSupa, updateUserSupa } from './server';
import { userDisplayNameRegex } from '@/components/SignupForm';
import {
  AlertBox,
  AlertBoxAction,
  AlertBoxCancel,
  AlertBoxFooter,
  AlertBoxHeader,
  AlertBoxTitle,
} from '@/components/ui/AlertBox';
import { useRef, useState } from 'react';
import { UserState } from '@/stores/userStore';
import { redirect } from 'next/navigation';
import { removeImage, uploadImage } from '@/utils/supabase/storage/client';

type ChangeNameFormProps = {
  oldUsername?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ChangeNameForm = ({ oldUsername, ...props }: ChangeNameFormProps) => {
  const popover = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const nameWarning = useRef<HTMLSpanElement>(null);
  const [newName, setNewName] = useState<string>('');

  const updateDisplayName = async () => {
    toast.loading('Aguarde...', { id: 'loading-toast' });

    const displayName = nameInput.current?.value || '';

    // Validação do nome de usuário
    if (!displayName.match(userDisplayNameRegex)) {
      toast.error(
        'O nome de usuário deve ter entre 3 e 29 caracteres.\nNão pode possuir espaços, somente letras, números e underlines "_"'
      );
      toast.dismiss('loading-toast');
      return;
    }

    const { error } = await updateUserNameSupa(displayName);

    toast.dismiss('loading-toast');

    if (error) {
      toast.error(`Erro ao atualizar nome: ${error.message}`);
    } else {
      toast.success('Nome de usuário atualizado com sucesso!');
      popover.current?.hidePopover();
      redirect(`/profile/${displayName}`);
    }
  };

  const clientValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target?.value;
    setNewName((prev) => (value !== prev ? value : prev));

    if (!value.match(userDisplayNameRegex)) {
      const text =
        'O nome de usuário deve ter entre 3 e 29 caracteres.\nNão pode possuir espaços, somente letras, números e underlines "_"';
      target.setCustomValidity(text);
      if (nameWarning.current) nameWarning.current.innerHTML = text;
    } else {
      target.setCustomValidity('');
      if (nameWarning.current) nameWarning.current.innerHTML = '';
    }
  };

  return (
    <AlertBox
      ref={popover}
      popover='manual'
      {...props}
    >
      <AlertBoxHeader>
        <AlertBoxTitle>Alterar Nome de Usuário</AlertBoxTitle>
        <input
          type='text'
          placeholder={oldUsername}
          className='p-2 outline-none ring-2 ring-logo-200 focus:outline-1 rounded-xl invalid:ring-warning invalid:text-warning'
          ref={nameInput}
          onChange={clientValidation}
        />
        <span
          ref={nameWarning}
          className='text-warning text-base font-medium'
        ></span>
      </AlertBoxHeader>
      <AlertBoxFooter>
        <AlertBoxAction asChild>
          <button
            disabled={!newName.match(userDisplayNameRegex)}
            onClick={updateDisplayName}
          >
            Atualizar
          </button>
        </AlertBoxAction>
        <AlertBoxCancel
          onClick={() => {
            popover.current?.hidePopover();
            if (!nameInput.current?.value) return;
            try {
              nameInput.current.value = '';
            } catch (error) {
              console.error(error);
              const form = document.createElement('form'),
                parent = nameInput.current.parentNode,
                ref = nameInput.current.nextSibling;
              form.appendChild(nameInput.current);
              form.reset();
              parent?.insertBefore(nameInput.current, ref);
            }
          }}
        >
          Cancelar
        </AlertBoxCancel>
      </AlertBoxFooter>
    </AlertBox>
  );
};

type ChangeProfileImageFormProps = { profile: UserState['user']['profile'] } & React.HTMLAttributes<HTMLDivElement>;

export const ChangeProfileImageForm = ({ profile, ...props }: ChangeProfileImageFormProps) => {
  const popover = useRef<HTMLDivElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 210000;
    const f = event.target.files?.[0] || null;
    if (f && f.size <= maxSize) {
      setFile(f);
    } else if (f && f.size > maxSize) {
      toast.error('Arquivo muito grande! Envie uma imagem com menos de 200KB');
      setFile(null);
    }
  };

  const handleUploadedImage = async () => {
    if (!file) return;
    const t = toast.loading('Aguarde...');
    const { error } = await uploadAvatar(profile.avatar_url, file);
    if (error) toast.error('Houve um erro ao enviar a imagem: ' + error.message);
    else {
      popover.current?.hidePopover();
      toast.success('Imagem atualizada com sucesso!');
    }
    toast.dismiss(t);
    setFile(null);
  };

  const uploadAvatar = async (oldAvatarUrl: string, imageToUpload: File) => {
    const oldImagePath = oldAvatarUrl
      .slice(oldAvatarUrl.lastIndexOf('profile-pictures/'))
      .replace('profile-pictures/', '');

    const { error: removeError } = await removeImage({
      bucket: 'profile-pictures',
      imagePaths: [oldImagePath],
    });

    if (removeError) return { error: removeError };

    const { imageURL, error: uploadError } = await uploadImage({
      file: imageToUpload,
      bucket: 'profile-pictures',
      folder: 'profiles',
    });

    if (uploadError) return { error: uploadError };

    const { error: updateError } = await updateUserSupa({
      data: { avatar_url: imageURL },
    });

    if (updateError) return { error: updateError };

    return { error: null };
  };

  return (
    <AlertBox
      ref={popover}
      popover='manual'
      {...props}
    >
      <AlertBoxHeader>
        <AlertBoxTitle>Alterar Foto de Perfil</AlertBoxTitle>
        <input
          type='file'
          accept='image/*'
          className='peer/file hidden'
          ref={imageInput}
          onChange={handleFileChange}
        />
        <button
          className='p-2 outline-none ring-2 ring-logo-200 focus:ring-finished-100 rounded-xl peer-invalid/file:ring-warning peer-invalid/file:text-warning cursor-pointer'
          onClick={() => imageInput.current?.click()}
        >
          {file ? file.name : 'Envie uma imagem'}
        </button>
      </AlertBoxHeader>
      <AlertBoxFooter>
        <AlertBoxAction asChild>
          <button
            disabled={!file}
            onClick={handleUploadedImage}
          >
            Atualizar
          </button>
        </AlertBoxAction>
        <AlertBoxCancel
          onClick={() => {
            popover.current?.hidePopover();
            try {
              if (imageInput.current?.value) imageInput.current.value = '';
            } catch (error) {
              console.error(error);
              if (imageInput.current?.value) {
                const form = document.createElement('form'),
                  parent = imageInput.current.parentNode,
                  ref = imageInput.current.nextSibling;
                form.appendChild(imageInput.current);
                form.reset();
                parent?.insertBefore(imageInput.current, ref);
              }
            }
            setFile(null);
          }}
        >
          Cancelar
        </AlertBoxCancel>
      </AlertBoxFooter>
    </AlertBox>
  );
};
