import { clsxMerge, joinClassNames } from '../utils';
import { type ChangeEvent, type ForwardedRef, forwardRef, type TextareaHTMLAttributes, useId, useState } from 'react';
import { cva } from 'class-variance-authority';
import { Avatar, type AvatarProps } from './avatar';
import { Label } from './label';

const textareaContainerVariants = cva(
  joinClassNames(
    'inline-flex flex-col items-start gap-1.5 stroke-black transition-colors duration-300 ease-in-out',
    'focus-within:stroke-blue-700'
  ),
  {
    variants: {
      error: {
        true: 'stroke-red-500 focus-within:stroke-red-500',
        false: '',
      },
      disabled: {
        true: 'stroke-slate-400 text-slate-400',
        false: '',
      },
    },
  }
);

const textareaVariants = cva(
  joinClassNames(
    'w-full resize rounded-lg border border-slate-200 p-3 pb-5 text-xs font-normal placeholder-slate-500 outline-none transition-colors duration-300 ease-in-out',
    'scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-500 active:scrollbar-thumb-slate-500',
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400',
    'focus:border-blue-600'
  ),
  {
    variants: {
      error: {
        true: 'border-red-500 text-red-500 ring-1 ring-red-500 focus:border-red-500 focus:text-black focus:ring-red-500 focus:ring-offset-0',
        false: '',
      },
    },
  }
);

const textareaHelperTextVariants = cva('text-slate-500 transition-colors duration-300 ease-in-out', {
  variants: {
    error: {
      true: 'text-red-500',
      false: '',
    },
  },
});

const textareaLabelVariants = cva('whitespace-nowrap', {
  variants: {
    disabled: {
      true: 'text-slate-400',
      false: 'text-black',
    },
  },
});

export interface TextareaVariants {
  disabled?: boolean;
  /** If true, the textarea will display an error state. */
  error?: boolean;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaVariants {
  /** Props for Avatar shown to the left of the textarea. */
  avatar?: AvatarProps;
  /** Sets or retrieves the width of the object. */
  cols?: number;
  /** Sets or retrieves the number of horizontal rows contained in the object. */
  rows?: number;
  /** Custom class for the textarea container. */
  containerClassName?: string;
  /** If true, the textarea will be disabled. */
  disabled?: boolean;
  /** A helper text to display below the textarea. */
  helperText?: string;
  /** The label text to display above the textarea. */
  label?: string;
  /** The placeholder text to display in the textarea. */
  placeholder?: string;
  /** If true, the textarea will be read-only. */
  readOnly?: boolean;
  /** The maximum length of the textarea content. */
  maxLength?: number;
}

const Root = ({
  error = false,
  disabled = false,
  readOnly = false,
  ref,
  maxLength,
  className,
  containerClassName,
  label,
  helperText,
  ...rest
}: Omit<TextareaProps, 'avatar'> & { ref: ForwardedRef<HTMLTextAreaElement> }) => {
  const inputId = useId();
  const helperTextId = useId();
  const [currentLength, setCurrentLength] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(event.target.value.length);
    rest.onChange?.(event);
  };

  return (
    <div className={clsxMerge(textareaContainerVariants({ error, disabled }), containerClassName)}>
      {label && (
        <Label htmlFor={rest.id ?? inputId} size='small' className={clsxMerge(textareaLabelVariants({ disabled }))}>
          {label}
        </Label>
      )}
      <textarea
        ref={ref}
        className={clsxMerge(textareaVariants({ error }), className)}
        disabled={disabled}
        aria-disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={handleChange}
        id={rest.id ?? inputId}
        aria-describedby={helperText ? helperTextId : undefined}
        {...rest}
      />
      <p className='flex w-full items-center justify-between text-xs'>
        {helperText && (
          <span id={helperTextId} className={clsxMerge('font-medium', textareaHelperTextVariants({ error }))}>
            {helperText}
          </span>
        )}
        {maxLength !== undefined && maxLength >= 0 ? (
          <span
            id={`${rest.id ?? inputId}-character-count`}
            className={clsxMerge(textareaHelperTextVariants({ error }))}
          >
            {currentLength}/{maxLength}
          </span>
        ) : null}
      </p>
    </div>
  );
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ avatar, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    if (avatar) {
      return (
        <div className='relative inline-flex items-start justify-start gap-4'>
          <Avatar {...avatar} />
          <Root ref={ref} {...props} />
        </div>
      );
    }

    return <Root ref={ref} {...props} />;
  }
);

Textarea.displayName = 'Textarea';
