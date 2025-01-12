import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center h-screen bg-center bg-cover gap-2 flex-col'>
      <LoginForm />
      <div className='inline-flex gap-1'>
        Não tem uma conta? 
        <Link href='/register' className='underline text-blue-500'>
          Cadastre-se!
        </Link>
      </div>
      
      {/* Botão para "Esqueci a senha" */}
      <div className='mt-4'>
        <Link href='/resetPassword' className='underline text-blue-500'>
          Esqueci a senha
        </Link>
      </div>
    </div>
  );
}