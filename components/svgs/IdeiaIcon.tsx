'use client';
import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const IdeaIcon = (props: IconProps) => (
  <svg
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M30.8571 0C40.3249 0 48 7.67512 48 17.1429V30.8571C48 40.3249 40.3249 48 30.8571 48H17.1429C7.67512 48 0 40.3249 0 30.8571V17.1429C0 7.67512 7.67512 0 17.1429 0H30.8571Z'
      fill='#D9D9D9'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24 7.80262C31.2463 3.96615 33.8038 6.5237 35.0825 12.9176C41.4763 14.1963 44.0338 16.7538 40.1975 24.0002C44.0338 31.2464 41.4763 33.8039 35.0825 35.0827C33.8038 41.4764 31.2463 44.0339 24 40.1977C16.7537 44.0339 14.1962 41.4764 12.9175 35.0827C6.5237 33.8039 3.96619 31.2464 7.80246 24.0002C3.96619 16.7538 6.5237 14.1961 12.9175 12.9175C14.1962 6.52353 16.7537 3.96615 24 7.80262ZM17.18 21.4425C17.18 17.9113 20.4688 15.0489 24 15.0489C27.5312 15.0489 30.82 17.9113 30.82 21.4425C30.82 24.9737 28.6887 25.2789 26.9837 28.689H21.0162C19.3112 25.2788 17.18 24.9737 17.18 21.4425ZM25.705 32.9515C26.4112 32.9515 26.9837 32.3789 26.9837 31.6727V29.9677H21.0162V31.6727C21.0162 32.3789 21.5887 32.9515 22.295 32.9515H25.705Z'
      fill='black'
    />
  </svg>
);
export default IdeaIcon;
