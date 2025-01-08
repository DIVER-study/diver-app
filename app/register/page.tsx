import SignupForm from '@/components/SignupForm';
import Link from 'next/link';
import React from 'react';

function SignUpPage() {
  return (
    <div className='flex items-center justify-center h-screen bg-center bg-cover gap-2 flex-col'>
      <SignupForm />
      <div className='inline-flex gap-1'>
        Já tem uma conta?
        <Link
          href='/login'
          className='underline text-blue-500'
        >
          Entre aqui!
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
