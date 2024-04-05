import { clsxMerge } from '../utils';
import { Label } from './label';
import { cva } from 'class-variance-authority';
import { type InputHTMLAttributes, type ReactNode } from 'react';

const switchDotVariants = cva(
  'absolute top-0.5 z-10 cursor-pointer rounded-full border border-slate-50 bg-blue-700 transition duration-300 ' +
    'peer-checked:translate-x-5 peer-checked:border-blue-700 peer-checked:bg-white ' +
    'peer-disabled:cursor-not-allowed peer-disabled:border-slate-100 peer-disabled:bg-slate-400',
  {
    variants: {
      size: {
        medium: 'left-[3px] size-5 peer-checked:left-[5px]',
        small: 'left-[2px] size-4',
      },
    },
  }
);

const switchContainerVariants = cva(
  'block cursor-pointer rounded-full border border-slate-300 bg-slate-50 transition duration-300 ' +
    'peer-checked:border-blue-700 peer-checked:bg-blue-700 ' +
    'peer-disabled:cursor-not-allowed peer-disabled:border-slate-100 peer-disabled:bg-slate-100',
  {
    variants: {
      size: {
        medium: 'h-6 w-12',
        small: 'h-5 w-10',
      },
    },
  }
);

const switchIconVariants = cva(
  'pointer-events-none absolute top-1/2 flex size-[18px] -translate-y-1/2 items-center justify-center overflow-hidden transition duration-300 peer-disabled:stroke-slate-400',
  {
    variants: {
      checked: {
        true: 'invisible left-3 -translate-x-1/2 stroke-white peer-checked:visible',
        false: 'right-1 stroke-blue-700 peer-checked:invisible',
      },
      size: {
        medium: '',
        small: '',
      },
    },
    compoundVariants: [
      {
        size: 'small',
        checked: true,
        class: 'left-2.5',
      },
      {
        size: 'small',
        checked: false,
        class: 'right-0.5',
      },
    ],
  }
);

const switchTextVariants = cva(
  'pointer-events-none absolute top-1/2 -translate-y-1/2 overflow-hidden text-xs font-semibold transition duration-300 peer-disabled:text-slate-400',
  {
    variants: {
      checked: {
        true: 'invisible left-3 -translate-x-1/2 text-white peer-checked:visible',
        false: 'right-2.5 text-blue-700 peer-checked:invisible',
      },
      size: {
        medium: '',
        small: '',
      },
    },
    compoundVariants: [
      {
        size: 'small',
        checked: true,
        class: 'left-2.5',
      },
      {
        size: 'small',
        checked: false,
        class: 'right-1.5',
      },
    ],
  }
);

export interface SwitchVariants {
  size?: 'medium' | 'small';
}

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'size'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>>,
    SwitchVariants {
  disabled?: boolean;
  label?: string;
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
  checkedText?: string;
  uncheckedText?: string;
}

export function Switch({
  size = 'medium',
  children,
  className,
  label,
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
          <div className={clsxMerge(switchContainerVariants({ size }))} />
          <div className={clsxMerge(switchDotVariants({ size }))}></div>
          {checkedIcon && !checkedText && (
            <div className={clsxMerge(switchIconVariants({ checked: true, size }))}>{checkedIcon}</div>
          )}
          {checkedText && !checkedIcon && (
            <div className={clsxMerge(switchTextVariants({ checked: true, size }))}>{checkedText}</div>
          )}
          {uncheckedIcon && !uncheckedText && (
            <div className={clsxMerge(switchIconVariants({ checked: false, size }))}>{uncheckedIcon}</div>
          )}
          {uncheckedText && !uncheckedIcon && (
            <div className={clsxMerge(switchTextVariants({ checked: false, size }))}>{uncheckedText}</div>
          )}
        </div>
        <span
          className={clsxMerge('ml-2 cursor-pointer whitespace-nowrap text-xs font-medium leading-none text-black', {
            'cursor-not-allowed text-slate-400': rest.disabled,
          })}
        >
          {label}
        </span>
      </Label>
    </div>
  );
}

Switch.displayName = 'Switch';
