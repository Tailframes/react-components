import type { SVGProps } from 'react';

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='m12 4-8 8m8 0L4 4' />
    </svg>
  );
}

CloseIcon.displayName = 'CloseIcon';
