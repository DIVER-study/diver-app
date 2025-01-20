import { SVGProps } from 'react';

export function CogTecLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 140 40'
      {...props}
    >
      <path d='M12.671 35.856c1.964 2.074-1.44 5.63-3.657 3.473-2.304-2.241 1.364-5.896 3.657-3.473ZM9.802 4.325l5.67.538c.367-.857 1.58-.98 2.146-.257.533.682-.003 1.497.051 1.622.095.216 2.408 2.73 2.594 2.774.239.057.736-.222 1.09-.21 1.813.06 2.555 2.598.88 3.562-.32.184-.878.176-1.027.424-.05.084-.548 1.787-.537 1.884.011.109.256.262.325.417.47 1.06-.93 2.094-1.764 1.206-.163-.174-.225-.493-.357-.565-.48-.264-1.421.03-1.97-.231-.453 1.151-1.326 1.454-2.503 1.372l-1.235 1.96c-.065.275.516.71.233 1.562-.516 1.557-2.995 1.12-2.81-.685.025-.253.263-.497.117-.686-.524-.23-1.35-1.303-1.807-1.45-.392-.126-.801.239-1.434-.119-.54-.305-.598-1.053-.7-1.142-.111-.096-2.639-.66-2.859-.672-.311-.016-.712.421-1.202.434-1 .025-1.616-1.135-1.056-1.961.159-.234.54-.38.614-.503.28-.46-.24-2.36-.055-3.016-2.916.362-2.95-4.007-.053-3.687.479.052.66.375 1.09.436L6.18 5.061c-.746-2.823 3.328-3.599 3.624-.735Zm5.565 6.131.586-3.727-.678-1.118c-.765.026-5.237-.805-5.57-.594-.04.026-.228.636-.461.708l3.62 3.86c.698.159 1.08.144 1.365.891zM7.9 11.03V6.395l-1.482-.598L3.567 7.97c.117.462.242.794.088 1.271l4.244 1.788zm7.371.112c-.321.033-.736-.067-1.038.022-.464.138-.713 1.094-1.699.423-.868-.59-.168-1.308-.33-1.67L8.627 6.148l-.271.092.118 4.939c.062.178.763.487.95.492.474.015.752-.587 1.496-.034.908.674.062 1.334.112 2.001.042.56.984 4.048 1.224 4.594.098.224.174.43.453.213l1.094-1.905c-1.199-1.421-.656-3.145 1.192-3.495l.275-1.902zm4.133-.67.285-1.002-2.402-2.634c-.17-.202-.547-.275-.653.03l-.58 3.606ZM7.9 11.7 3.321 9.803c1.345 1.6 2.656 3.269 4.075 4.802.135.145.28.36.504.334zm-5.026-1.117v2.848c.742.39 1.042.738 1.228 1.565l2.84.726.17-.398-4.237-4.742Zm16.474.559h-3.406l-.226 2.044.84.63 2.958-2.396-.166-.277zm-10.89.893v2.067c0 .058.104.892.13.932.02.032.35.112.488.236.7.63.172 1.44.326 1.787.144.322 1.491 1.074 1.737 1.512l.276.055.173-.278-1.285-4.75c-.113-.148-.535-.109-.788-.33-.419-.367-.1-1.197-1.057-1.232zm12.043.357-.492-.248-3.125 2.239.085.425 2.023.226c.38-.291.507-.633 1.07-.554l.439-2.087zm8.92 12.119c-.154.166-.807.403-.851.663-.06.35.941.515.878.863-.22.255-.402.374-.52.715-.282.807.064 1.659-.043 2.526-.228 1.832-2.177 1.03-3.394.964-4.17-.228-8.378 1.36-11.446 4.132.524-1.515 1.458-3.058 2.366-4.39 2.115-3.107 4.822-5.154 6.363-8.715 3.882-8.964.94-20.107-10.122-20.743-1.45-.082-2.728.114-4.14.228-.123.01-.416.082-.388-.11 7.71-2.223 17.561 1.379 19.623 9.694.575 2.32.62 3.77 1.841 5.976.352.637 2 2.765 2.084 3.175.19.93-2.137 1.301-2.385 1.816-.483 1 .804 2.479.134 3.206z' />
      <text
        x={45}
        y={27}
      >
        <tspan className='italic font-new-zen font-bold text-3xl'>CogTec</tspan>
      </text>
    </svg>
  );
}

export function ExitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 36 31'
      {...props}
    >
      <path d='M13.232 0v4.41h17.642v22.053H13.232v4.41h22.052V0H13.232Zm-4.41 8.821L0 15.437l8.821 6.616v-4.41h17.642v-4.411H8.821v-4.41Z' />
    </svg>
  );
}

export function ArrowIndicator(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...props}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#000'
          d='M22 10.268c1.333.77 1.333 2.694 0 3.464L10 20.66c-1.333.77-3-.192-3-1.732V5.072c0-1.54 1.667-2.502 3-1.732l12 6.928Z'
        />
        <path
          fill='#fff'
          d='M19 10.268c1.333.77 1.333 2.694 0 3.464L7 20.66c-1.333.77-3-.192-3-1.732V5.072C4 3.532 5.667 2.57 7 3.34l12 6.928Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M0 0h24v24H0z'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      ></path>
    </svg>
  );
}
