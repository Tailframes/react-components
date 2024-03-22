import type { SVGProps } from 'react';

export function UserIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d='M16.6668 17.5V15.8333C16.6668 14.9492 16.3157 14.1014 15.6905 13.4763C15.0654 12.8512 14.2176 12.5 13.3335 12.5H6.66683C5.78277 12.5 4.93493 12.8512 4.3098 13.4763C3.68469 14.1014 3.3335 14.9492 3.3335 15.8333V17.5' />
      <path d='M9.99984 10.0002C11.8408 10.0002 13.3332 8.50775 13.3332 6.66683C13.3332 4.82588 11.8408 3.3335 9.99984 3.3335C8.15889 3.3335 6.6665 4.82588 6.6665 6.66683C6.6665 8.50775 8.15889 10.0002 9.99984 10.0002Z' />
    </svg>
  );
}

UserIcon.displayName = 'UserIcon';
