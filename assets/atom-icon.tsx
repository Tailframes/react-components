import type { SVGProps } from 'react';

export function AtomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='white'
      strokeWidth='1.5'
      {...props}
    >
      <g clipPath='url(#clip0_3526_27521)'>
        <circle cx='11.8286' cy='11.6814' r='3' />
        <ellipse
          cx='5.40957'
          cy='11.2139'
          rx='5.40957'
          ry='11.2139'
          transform='matrix(-0.707107 0.707107 0.707107 0.707107 7.65082 0)'
        />
        <ellipse cx='11.7545' cy='11.7546' rx='5.40957' ry='11.2139' transform='rotate(45 11.7545 11.7546)' />
      </g>
      <defs>
        <clipPath id='clip0_3526_27521'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

AtomIcon.displayName = 'AtomIcon';
