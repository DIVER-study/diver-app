import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className='block content-center h-screen'>
      <form className='flex flex-col max-w-xs mx-auto gap-2 p-4 ring-1 ring-neutral-500 rounded-xl'>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          type='email'
          required
          className='bg-neutral-200 p-2 rounded-md'
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          name='password'
          type='password'
          required
          className='bg-neutral-200 p-2 rounded-md'
        />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign Up</button>
      </form>
    </div>
  );
}
