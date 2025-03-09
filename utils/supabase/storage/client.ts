'use client';

import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import { createClient } from '../client';

function getStorage() {
  const { storage } = createClient();
  return storage;
}

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
};

type RemoveProps = {
  imagePaths: string[];
  bucket: string;
};

export async function uploadImage({ file, bucket, folder }: UploadProps) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const path = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
      useWebWorker: true,
      maxWidthOrHeight: 720,
    });
  } catch (error) {
    console.error(error);
    return { imageURL: '', error: new Error('Falha na compressão de imagem') };
  }

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) return { imageURL: '', error: new Error('Erro ao enviar a imagem') };

  const { data: imageData } = storage.from(bucket).getPublicUrl(data.path);

  return { imageURL: imageData.publicUrl, error: null };
}

export async function removeImage({ imagePaths, bucket }: RemoveProps) {
  const storage = getStorage();

  console.log(imagePaths);
  const response = await storage.from(bucket).remove(imagePaths);

  return response;
}
