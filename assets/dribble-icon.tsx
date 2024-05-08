import type { SVGProps } from 'react';

export function DribbleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <g clipPath='url(#clip0_4519_3775)'>
        <path d='M1.66666 9.99999C1.66666 14.6023 5.39761 18.3333 9.99999 18.3333C14.6023 18.3333 18.3333 14.6023 18.3333 9.99999C18.3333 5.39761 14.6023 1.66666 9.99999 1.66666C5.39761 1.66666 1.66666 5.39761 1.66666 9.99999Z' />
        <path d='M13.8938 17.3696C12.9167 11.6667 10.4167 6.6667 7.08334 2.19138' />
        <path d='M1.72211 9.03382C5.00003 9.16666 12.7357 8.74999 15.9512 4.16666' />
        <path d='M18.3064 10.675C12.7865 9.03391 6.25 11.6667 4.35953 16.1344' />
      </g>
      <defs>
        <clipPath id='clip0_4519_3775'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

DribbleIcon.displayName = 'DribbleIcon';
