import { clsxMerge } from '../utils';
import { HalfStarIcon } from '../assets/half-star-icon';
import { StarIcon } from '../assets/star-icon';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode } from 'react';

const rateVariants = cva('flex items-center justify-center gap-0.5', {
  variants: {},
  defaultVariants: {},
});

export interface RateVariants extends VariantProps<typeof rateVariants> {}

export interface RateProps extends HTMLAttributes<HTMLDivElement>, RateVariants {
  value: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  label?: ReactNode;
  stars?: 1 | 2 | 3 | 4 | 5;
  labelProps?: HTMLAttributes<HTMLSpanElement>;
}

export function Rate({ value, className, label, stars = 5, labelProps = {}, ...rest }: RateProps) {
  const ITEMS_COUNT = 5;
  const { className: labelClassName, ...labelRest } = labelProps;

  return (
    <div className={clsxMerge(rateVariants({}), className)} {...rest}>
      {[...Array(ITEMS_COUNT)].slice(0, stars).map((_, index) => (
        <div key={index} className='relative'>
          {value >= index + 1 ? <StarIcon className='fill-amber-300 stroke-amber-300' /> : <StarIcon />}
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
