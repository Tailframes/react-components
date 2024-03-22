import { clsxMerge } from '../utils';
import { HalfStarIcon } from '../assets/half-star-icon';
import { StarIcon } from '../assets/star-icon';
import { type HTMLAttributes } from 'react';

export interface RateProps extends HTMLAttributes<HTMLDivElement> {
  value: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  label?: string;
  stars?: 1 | 2 | 3 | 4 | 5;
  labelProps?: HTMLAttributes<HTMLSpanElement>;
}

export function Rate({ value, className, label, stars = 5, labelProps = {}, ...rest }: RateProps) {
  const { className: labelClassName, ...labelRest } = labelProps;

  return (
    <div className={clsxMerge('flex items-center justify-center gap-0.5', className)} {...rest}>
      {[...Array(stars)].map((_, index) => (
        <div key={index} className='relative'>
          {value >= index + 1 ? (
            <StarIcon className='fill-amber-300 stroke-amber-300' />
          ) : (
            <StarIcon className='fill-slate-200 stroke-slate-200' />
          )}
          {value > index && value < index + 1 ? (
            <HalfStarIcon className='absolute left-0 top-0 fill-amber-300 stroke-amber-300' />
          ) : null}
        </div>
      ))}
      {label && (
        <span
          className={clsxMerge('ml-1.5 text-sm font-normal leading-snug text-slate-500', labelClassName)}
          {...labelRest}
        >
          {label}
        </span>
      )}
    </div>
  );
}

Rate.displayName = 'Rate';
