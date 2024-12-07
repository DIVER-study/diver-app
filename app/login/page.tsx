import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-center bg-cover">
      <form className="flex flex-col max-w-xs w-full mx-4 gap-4 p-6 bg-white/90 rounded-xl shadow-md ring-1 ring-neutral-500">
        <label htmlFor="email" className="text-sm font-medium">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="text-sm font-medium">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="p-2 rounded-md bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          formAction={login}
          className="p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Log in
        </button>

        <button
          formAction={signup}
          className="p-2 mt-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
