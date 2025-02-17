import type { SVGProps } from 'react';

export function LogoutIcon(props: SVGProps<SVGSVGElement>) {
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
        d='M15.4047 7.64298L17.7617 10L15.4047 12.357'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M17.7617 10L8.33363 10' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M15.3033 15.3033C14.2544 16.3522 12.918 17.0665 11.4632 17.3559C10.0083 17.6453 8.50032 17.4968 7.12987 16.9291C5.75943 16.3614 4.58809 15.4001 3.76398 14.1668C2.93987 12.9334 2.5 11.4834 2.5 10C2.5 8.51664 2.93987 7.06659 3.76398 5.83322C4.58809 4.59986 5.75943 3.63856 7.12987 3.0709C8.50032 2.50325 10.0083 2.35472 11.4632 2.64411C12.918 2.9335 14.2544 3.6478 15.3033 4.6967'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

LogoutIcon.displayName = 'LogoutIcon';
