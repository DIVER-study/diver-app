import { type IconProps } from '.';

const CloseIcon = (props: IconProps) => {
  return (
    <svg
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M3 3L29 29M3 29L29 3'
        stroke='currentColor'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CloseIcon;
