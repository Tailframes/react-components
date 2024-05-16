import type { SVGProps } from 'react';

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d='M5.83325 8.33325L9.99992 12.4999L14.1666 8.33325' />
    </svg>
  );
}

ChevronIcon.displayName = 'ChevronIcon';
