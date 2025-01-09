import { clsxMerge, joinClassNames } from '../../utils';
import { Label, type LabelProps } from '../label';
import { cva } from 'class-variance-authority';
import { type ChangeEvent, type InputHTMLAttributes, useId, useState } from 'react';

const radioVariants = cva(
  joinClassNames(
    'peer cursor-pointer border-0 ring-2 ring-slate-300 ring-offset-2 transition-colors duration-300 ease-in-out',
    'checked:bg-none checked:ring-blue-700 checked:disabled:bg-slate-400',
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-50 disabled:ring-slate-200 disabled:ring-offset-slate-50',
    'focus:ring-[3px] focus:ring-offset-2',
    'hover:ring-blue-700'
  ),
  {
    variants: {
      size: {
        medium: 'size-[10px]',
        small: 'size-2',
      },
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
});

export interface RadioVariants {
  /** Size of the radio button. */
  size?: 'medium' | 'small';
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type' | 'size'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>>,
    RadioVariants {
  /** If true, the radio button will be disabled. */
  disabled?: boolean;
  /** Label for the radio button. */
  label: string;
  /** Custom `Label` props */
  labelProps?: Omit<LabelProps, 'htmlFor'>;
}

export function Radio({ size = 'medium', children, className, label, labelProps = {}, ...rest }: RadioProps) {
  const id = useId();
  const [checked, setChecked] = useState(rest.defaultChecked ?? false);

  const { className: labelClassName, ...labelRest } = labelProps;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    rest.onChange?.(event);
  };

  return (
    <div className={clsxMerge(radioContainerVariants({ size }), className)}>
      <input
        id={rest.id ?? id}
        type='radio'
        tabIndex={checked ? 0 : -1}
        aria-checked={checked}
        onChange={handleChange}
        className={clsxMerge(radioVariants({ size }), className)}
        {...rest}
      />
      <Label
        htmlFor={rest.id ?? id}
        size='small'
        className={clsxMerge(
          'whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 hover:cursor-pointer',
          labelClassName
        )}
        {...labelRest}
      >
        {label}
      </Label>
    </div>
  );
}

Radio.displayName = 'Radio';
