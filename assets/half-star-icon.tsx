import { type SVGProps } from 'react';

export function HalfStarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M6.438 20L12 17.0952V3L9.219 8.59516L3 9.4979L7.5 13.8507L6.438 20Z' />
    </svg>
  );
}

HalfStarIcon.displayName = 'HalfStarIcon';
