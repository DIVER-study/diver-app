'use client';

import Link from 'next/link';
import { LibraryIcon, SadFace } from './Svgs';

type AlertModalProps = {
  message: string;
  explanation?: string;
  action: () => void;
};
export function AlertRightAnswer({ message, explanation = '', action: onConfirm }: AlertModalProps) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className=' flex flex-col items-center justify-center bg-white border-4 border-black rounded-lg p-6 w-[40rem] h-[25rem] text-center shadow-lg'>
        <p className='text-black text-3xl font-bold mb-10 uppercase'>{message}</p>
        <p className='text-black text-3xl font-bold mb-10'>{explanation}</p>
        <div className='flex justify-center gap-8'>
          <button
            onClick={onConfirm}
            className='text-2xl px-10 py-[4px] border-2 border-black rounded-md text-black hover:bg-gray-200 uppercase'
          >
            seguir
          </button>
        </div>
      </div>
    </div>
  );
}

export function AlertWrongAnswer({ message, explanation, action: onConfirm }: AlertModalProps) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white border-4 border-black rounded-lg p-[6rem] w-[40rem] h-[25rem] text-center shadow-lg flex flex-col items-center justify-center'>
        <h2 className='text-black text-3xl font-bold mb-10 uppercase'>{message}</h2>
        <p className='text-black text-justify text-sm mb-10 '>{explanation}</p>

        <div className='flex justify-between items-center w-[30rem]'>
          <div>
            <Link href='/library'>
              <LibraryIcon
                width={40}
                height={40}
              />
            </Link>
          </div>
          <div>
            <button
              onClick={onConfirm}
              className='text-xl text-center pt-1 pb-1 pl-[20px] pr-[20px]  border-t-2 border-l-2 border-black border-b-4 border-r-4 rounded-md shadow-[4px_4px_4px_rgba(0,0,0,0.6)] hover:shadow-[6px_6px_6px_rgba(0,0,0,0.7)] uppercase'
            >
              seguir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlertConfirm({ message, explanation = '', action }: AlertModalProps) {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white border-4 border-black rounded-lg p-6 w-[60rem] h-[30rem] text-center shadow-lg'>
        <div className='flex items-center justify-center mb-4'>
          <SadFace
            width={200}
            height={200}
          />
        </div>
        <p className='text-black text-3xl font-bold mb-10 uppercase'>{message}</p>
        <p className='text-black text-3xl font-bold mb-10'>{explanation}</p>
        <div className='flex justify-center gap-8'>
          <button className='text-2xl px-10 py-[4px] border-2 border-black rounded-md text-black hover:bg-gray-200'>
            <Link href='/'>SIM</Link>
          </button>
          <button
            onClick={action}
            className='text-2xl px-10 py-[4px] border-2 border-black rounded-md text-black hover:bg-gray-200 uppercase'
          >
            não
          </button>
        </div>
      </div>
    </div>
  );
}
