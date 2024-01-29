import { clsxMerge } from '../utils';
import { Label, type LabelProps } from './label';
import { cva, type VariantProps } from 'class-variance-authority';
import { type InputHTMLAttributes } from 'react';

const radioVariants = cva(
  'peer cursor-pointer border-0 ring-2 ring-slate-300 ring-offset-2 transition-colors duration-300 ease-in-out ' +
    'hover:ring-blue-700 ' +
    'checked:bg-none checked:ring-blue-700 checked:ring-offset-2 checked:disabled:bg-slate-400 checked:disabled:ring-offset-2 ' +
    'focus:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-50 disabled:ring-slate-200 disabled:ring-offset-0',
  {
    variants: {
      size: {
        medium: 'size-[10px] disabled:size-[14px] disabled:checked:size-[10px]',
        small: 'size-2 disabled:size-3 disabled:checked:size-3',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const radioContainerVariants = cva('inline-flex items-center justify-start', {
  variants: {
    size: {
      medium: 'gap-3',
      small: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface RadioVariants extends VariantProps<typeof radioVariants> {}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'size'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>>,
    RadioVariants {
  label?: string;
  labelProps?: LabelProps;
}

export function Radio({ children, className, label, labelProps = {}, size, ...rest }: RadioProps) {
  const { className: labelClassName, ...labelRest } = labelProps;

  return (
    <div className={clsxMerge(radioContainerVariants({ size }), className)}>
      <input type='radio' className={clsxMerge(radioVariants({ size }), className)} {...rest} />
      {label && (
        <Label
          htmlFor={rest.id}
          size='small'
          className={clsxMerge(
            'whitespace-nowrap hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:text-slate-400',
            labelClassName
          )}
          {...labelRest}
        >
          {label}
        </Label>
      )}
    </div>
  );
}

Radio.displayName = 'Radio';
