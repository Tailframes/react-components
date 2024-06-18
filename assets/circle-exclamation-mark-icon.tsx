import type { SVGProps } from 'react';

export function CircleExclamationMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10 10V5.83333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10.8333 13.3333C10.8333 13.7936 10.4602 14.1667 10 14.1667C9.53976 14.1667 9.16667 13.7936 9.16667 13.3333C9.16667 12.8731 9.53976 12.5 10 12.5C10.4602 12.5 10.8333 12.8731 10.8333 13.3333Z'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

CircleExclamationMarkIcon.displayName = 'CircleExclamationMarkIcon';
