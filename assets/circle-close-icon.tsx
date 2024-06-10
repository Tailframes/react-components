import type { SVGProps } from 'react';

export function CircleCloseIcon(props: SVGProps<SVGSVGElement>) {
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
        d='M12.5 7.5L7.5 12.5M12.5 12.5L7.5 7.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

CircleCloseIcon.displayName = 'CircleCloseIcon';
