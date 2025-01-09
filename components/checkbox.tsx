import { clsxMerge, joinClassNames } from '../utils';
import { Label } from './label';
import { cva } from 'class-variance-authority';
import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const checkboxVariants = cva(
  joinClassNames(
    'peer cursor-pointer rounded border-2 border-slate-400 transition-colors duration-300 ease-in-out',
    'checked:bg-blue-700 checked:hover:bg-blue-700 checked:disabled:border-slate-300 checked:disabled:bg-slate-300 checked:disabled:hover:bg-slate-300',
    'disabled:hover:none disabled:cursor-not-allowed disabled:border-slate-200 disabled:indeterminate:border-slate-300 disabled:indeterminate:bg-slate-300 disabled:hover:bg-transparent',
    'focus:ring-transparent',
    'hover:border-blue-700 hover:bg-blue-50',
    'indeterminate:bg-blue-700 indeterminate:disabled:hover:bg-slate-300'
  ),
  {
    variants: {
      size: {
        medium: 'size-4',
        small: 'size-[14px]',
      },
    },
  }
);

const checkboxContainerVariants = cva('inline-flex items-center justify-start gap-2', {
  variants: {
    size: {
      medium: '',
      small: '',
    },
  },
});

export interface CheckboxVariants {
  /** The size of the checkbox. */
  size?: 'small' | 'medium';
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, CheckboxVariants {
  /** The label of the checkbox, displayed on the right. */
  label?: string;
  /** If true, the checkbox will be indeterminate. */
  indeterminate?: boolean;
  /** If true, the button will be disabled. */
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size = 'medium', children, className, label, indeterminate, ...rest }: CheckboxProps, ref) => {
    const id = useId();
    const innerRef = useRef<HTMLInputElement>(null);
    const [checked, setChecked] = useState(rest.defaultChecked ?? false);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => innerRef.current!, [innerRef]);

    useEffect(() => {
      if (typeof indeterminate === 'boolean' && innerRef?.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [innerRef, indeterminate]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      rest.onChange?.(event);
    };

    return (
      <div className={clsxMerge(checkboxContainerVariants({ size }), className)}>
        <input
          id={rest.id ?? id}
          ref={innerRef}
          type='checkbox'
          aria-checked={indeterminate ? 'mixed' : checked}
          onChange={handleChange}
          className={clsxMerge(checkboxVariants({ size }), className)}
          checked={checked}
          {...rest}
        />
        {label && (
          <Label
            htmlFor={rest.id ?? id}
            size='small'
            className='whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 hover:cursor-pointer'
          >
            {label}
          </Label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
