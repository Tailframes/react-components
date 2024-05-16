import type { SVGProps } from 'react';

export function CircleArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#1D4ED8'
      strokeWidth='1.5'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M11 16L15 12L11 8' strokeLinecap='round' strokeLinejoin='round' />
      <circle cx='12' cy='12' r='9' />
    </svg>
  );
}

CircleArrowRightIcon.displayName = 'CircleArrowRightIcon';
