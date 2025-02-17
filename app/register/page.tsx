import SignupForm from '@/components/SignupForm';
import React from 'react';

function SignUpPage() {
  return (
    <div className='flex items-center justify-center bg-[#F8F3E0] h-screen gap-15 flex-row'>
      <div className='flex flex-col items-center justify-center'>
        <img
          src='/assets/registerImage.png'
          alt='Cachorro interagindo com homem'
          className='w-130 object-cover' 
        />
        <p className='text-center font-bold w-120 mt-[-5%]'><span className='text-[#FD7401]'>Já percebeu como um cachorro aprende truques?</span> Ele responde a comandos, recebe recompensas e evita punições. Agora imagine que isso também explica como nós aprendemos e nos comportamos no dia a dia!</p>
      </div>
      
      <div className='flex flex-col items-center w-110 mt-4'>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUpPage;
