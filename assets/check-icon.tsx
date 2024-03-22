import type { SVGProps } from 'react';

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M6 12.8L9.42857 16L18 8' />
    </svg>
  );
}

CheckIcon.displayName = 'CheckIcon';
