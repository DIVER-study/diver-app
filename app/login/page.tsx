import LoginForm from '@/components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center bg-[#F8F3E0] h-screen gap-15 flex-row'>
      <div className='flex flex-col items-center justify-center'>
        <Image
          src='/assets/loginImage.png'
          alt='Pesoas conversando'
          className='w-130 object-cover'
          width={768}
          height={768}
        />
        <p className='text-center font-bold w-120 mt-[-5%]'>
          <span className='text-[#FD7401]'>O conhecimento não surge do nada,</span> ele cresce no bate-papo, na troca de
          ideias e nas conexões que fazemos com os outros. É na interação social que aprendemos de verdade!
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
