import { clsxMerge } from '../utils';
import { Label } from './label';
import { cva, type VariantProps } from 'class-variance-authority';
import { type InputHTMLAttributes, type ReactNode } from 'react';

const switchVariants = cva('', {
  variants: {
    size: {
      medium: '',
      small: '',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const switchDotVariants = cva(
  'block cursor-pointer rounded-full border border-slate-200 bg-slate-50 transition ' +
    'peer-checked:border-blue-700 peer-checked:bg-blue-700 ' +
    'peer-disabled:cursor-not-allowed peer-disabled:border-slate-100 peer-disabled:bg-slate-100',
  {
    variants: {
      size: {
        medium: 'h-6 w-12',
        small: 'h-5 w-10',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const switchContainerVariants = cva(
  'absolute top-0.5 cursor-pointer rounded-full border border-slate-200 bg-blue-700 transition ' +
    'peer-checked:translate-x-5 peer-checked:border-blue-700 peer-checked:bg-white ' +
    'peer-disabled:cursor-not-allowed peer-disabled:border-slate-400 peer-disabled:bg-slate-400',
  {
    variants: {
      size: {
        medium: 'left-[3px] size-5 peer-checked:left-[5px]',
        small: 'left-[2px] size-4',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export interface SwitchVariants extends VariantProps<typeof switchVariants> {}

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'size'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>>,
    SwitchVariants {
  label?: string;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
  checkedText?: string;
  uncheckedText?: string;
}

export function Switch({
  children,
  className,
  label,
  size,
  id,
  checkedIcon,
  uncheckedIcon,
  checkedText,
  uncheckedText,
  ...rest
}: SwitchProps) {
  return (
    <div className='inline-flex items-center justify-center'>
      <Label htmlFor={id} size='small' className='flex items-center'>
        <div className='relative'>
          <input type='checkbox' id={id} className='peer sr-only' {...rest} />
          <div className={clsxMerge(switchDotVariants({ size }))} />
          <div className={clsxMerge(switchContainerVariants({ size }))}></div>
          {checkedIcon && (
            <div className='pointer-events-none invisible absolute left-3 top-1/2 size-[18px] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden stroke-white peer-checked:visible peer-disabled:cursor-not-allowed peer-disabled:stroke-slate-400'>
              {checkedIcon}
            </div>
          )}
          {checkedText && (
            <div className='pointer-events-none invisible absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden text-xs font-semibold text-white peer-checked:visible peer-disabled:cursor-not-allowed peer-disabled:text-slate-400'>
              {checkedText}
            </div>
          )}
          {uncheckedIcon && (
            <div className='absolute right-1 top-1/2 size-[18px] -translate-y-1/2 cursor-pointer overflow-hidden stroke-blue-700 peer-checked:invisible peer-disabled:cursor-not-allowed peer-disabled:stroke-slate-400'>
              {uncheckedIcon}
            </div>
          )}
          {uncheckedText && (
            <div className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer overflow-hidden text-xs font-semibold text-blue-700 peer-checked:invisible peer-disabled:cursor-not-allowed peer-disabled:text-slate-400'>
              {uncheckedText}
            </div>
          )}
        </div>
        <span className='ml-2 whitespace-nowrap text-xs font-medium leading-none text-black'>{label}</span>
      </Label>
    </div>
  );
}

Switch.displayName = 'Switch';
