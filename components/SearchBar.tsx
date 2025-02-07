import { SearchIcon } from './Svgs';

export function SearchBar() {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='search'
        className='border-2 border-black rounded-lg w-40 focus:w-80 transition-all px-2 focus:py-1'
      />
      <SearchIcon className='shrink size-6' />
    </div>
  );
}
