import { SideBar } from '@/components/SideBar';

export default function RealmsPage() {
  const subjects = [
    { id: 1, name: 'TSC', disabled: false },
    { id: 2, name: 'Gestalt', disabled: true },
    { id: 3, name: 'Behaviorismo', disabled: true },
  ];
  return (
    <div className='flex h-screen'>
      <SideBar activeTab='estudos' />
      <main className='flex-1 flex justify-center items-center p-8'>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold mb-8 text-center'>Teorias</h1>
          <div className='flex flex-col gap-4'>
            {subjects.map(({ id, name, disabled }) => (
              <button
                key={id}
                disabled={disabled}
                className='py-4 text-xl rounded-lg transition disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed bg-blue-500 text-white hover:bg-blue-700 w-80'
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
