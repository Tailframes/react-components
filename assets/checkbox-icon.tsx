import type { SVGProps } from 'react';

export function CheckboxIcon(props: SVGProps<SVGSVGElement>) {
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
        d='M7.40274 9.33332L9.73734 11.6667L17.5 3.75M16.9975 8.2176C17.4019 9.90307 17.2206 11.6793 16.4848 13.2438C15.7489 14.8083 14.5039 16.0641 12.9619 16.7974C11.4199 17.5306 9.67622 17.696 8.02809 17.2651C6.37996 16.8343 4.9293 15.834 3.92329 14.4346C2.91727 13.0352 2.41815 11.3235 2.51095 9.59091C2.60376 7.85832 3.28276 6.21216 4.43225 4.9329C5.58175 3.65365 7.13063 2.82044 8.81497 2.57527C10.4993 2.33008 12.2149 2.6881 13.6694 3.5883'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

CheckboxIcon.displayName = 'CheckboxIcon';
