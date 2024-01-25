import { clsxMerge } from '../utils';
import { Badge, type BadgeProps } from './badge';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type HTMLAttributes, type ReactNode } from 'react';

const avatarVariants = cva('relative box-content flex items-center justify-center overflow-hidden', {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
    size: {
      large: 'size-[3.5rem]',
      medium: 'size-10',
      small: 'size-8',
    },
    badge: {
      true: '',
      false: '',
    },
    image: {
      true: '',
      false: '',
    },
    icon: {
      true: 'bg-blue-700 stroke-white',
      false: '',
    },
    text: {
      true: 'bg-blue-700',
      false: '',
    },
  },
  defaultVariants: {
    shape: 'circle',
    size: 'medium',
  },
  compoundVariants: [
    {
      shape: 'circle',
      size: ['medium', 'large'],
      badge: false,
      class: 'border-4 border-white shadow-md',
    },
    {
      shape: 'circle',
      size: ['medium', 'large'],
      text: false,
      icon: false,
      class: 'bg-white',
    },
  ],
});

const avatarIconVariants = cva('flex items-center justify-center', {
  variants: {
    size: {
      large: 'size-6',
      medium: 'size-[18px]',
      small: 'size-3.5',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const avatarTextVariants = cva('flex items-center justify-center font-semibold text-white', {
  variants: {
    size: {
      large: 'text-base',
      medium: 'text-sm',
      small: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface AvatarVariants extends Omit<VariantProps<typeof avatarVariants>, 'badge' | 'image' | 'icon' | 'text'> {
  badge?: true | BadgeProps;
  src?: string;
  icon?: ReactNode;
  text?: string;
}

type Type = { src: string } | { icon: ReactNode } | { text: string };

export type AvatarProps = (HTMLAttributes<HTMLDivElement> & AvatarVariants) &
  Type & {
    imgProps?: Omit<HTMLAttributes<HTMLImageElement>, 'src'>;
  };

const Root = ({ children, className, size, shape, badge, src, icon, text, imgProps = {}, ...rest }: AvatarProps) => (
  <div
    className={clsxMerge(
      avatarVariants({
        size,
        shape,
        badge: Boolean(badge),
        image: Boolean(src),
        text: Boolean(text),
        icon: Boolean(icon),
      }),
      className
    )}
    {...rest}
  >
    {!icon && !text && <img src={src} alt='avatar' className='aspect-square' {...imgProps} />}
    {icon && <div className={avatarIconVariants({ size })}>{children}</div>}
    {text && <span className={avatarTextVariants({ size })}>{text}</span>}
  </div>
);

export function Avatar(props: AvatarProps) {
  if (!props.badge) {
    return <Root {...props} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, size, shape, badge, src, icon, text, imgProps = {}, ...rest } = props;

  return (
    <div className='relative' {...rest}>
      <Root {...props} />
      <div className='absolute bottom-0 right-0 translate-y-2 rounded-full'>
        <Badge
          variant='success'
          className='box-content border-2 border-white'
          dotOnly
          {...(typeof badge === 'boolean' ? {} : badge)}
        />
      </div>
    </div>
  );
}

Avatar.displayName = 'Avatar';
