import type { SVGProps } from 'react';

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='black'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M4 6H20' />
      <path d='M4 12H20' />
      <path d='M4 18H20' />
    </svg>
  );
}

MenuIcon.displayName = 'MenuIcon';
