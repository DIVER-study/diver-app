'use client';
import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const CheckMarkIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0,0,256,256'
    {...props}
    fillRule='nonzero'
  >
    <g
      fill='#ffffff'
      fillRule='nonzero'
      stroke='none'
      strokeWidth='8'
      strokeLinecap='butt'
      strokeLinejoin='miter'
      strokeMiterlimit='10'
      strokeDasharray=''
      strokeDashoffset='0'
      fontFamily='none'
      fontWeight='none'
      fontSize='none'
      textAnchor='none'
      style={{ mixBlendMode: 'normal' }}
    >
      <g transform='scale(10.66667,10.66667)'>
        <path d='M20.29297,5.29297l-11.29297,11.29297l-4.29297,-4.29297l-1.41406,1.41406l5.70703,5.70703l12.70703,-12.70703z'></path>
      </g>
    </g>
  </svg>
);
export default CheckMarkIcon;
