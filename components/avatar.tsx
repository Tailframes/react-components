import { clsxMerge } from '../utils';
import { Badge, type BadgeProps } from './badge';
import { cva } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode } from 'react';

const avatarVariants = cva('relative box-content flex items-center justify-center overflow-hidden', {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
    size: {
      medium: 'size-10',
      small: 'size-8',
    },
    badge: {
      true: '',
      false: '',
    },
    elevated: {
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
  compoundVariants: [
    {
      shape: 'circle',
      elevated: true,
      badge: false,
      class: 'border-white drop-shadow-md',
    },
    {
      shape: 'circle',
      size: 'small',
      elevated: true,
      badge: false,
      class: 'border-2',
    },
    {
      shape: 'circle',
      size: 'medium',
      elevated: true,
      badge: false,
      class: 'border-[3px]',
    },
    {
      shape: 'circle',
      size: 'medium',
      text: false,
      icon: false,
      class: 'bg-white',
    },
  ],
});

const avatarIconVariants = cva('flex items-center justify-center', {
  variants: {
    size: {
      medium: 'size-[18px]',
      small: 'size-3.5',
    },
  },
});

const avatarTextVariants = cva('flex max-w-full items-center justify-start whitespace-nowrap font-medium text-white', {
  variants: {
    size: {
      medium: 'text-sm',
      small: 'text-xs',
    },
  },
});

export interface AvatarVariants {
  /** Shows a badge next to the avatar. */
  badge?: true | BadgeProps;
  /** Elevates the avatar, available only for circle shape without badge.  */
  elevated?: boolean;
  /** Shows an icon instead of text or image. */
  icon?: ReactNode;
  /** Shape of the avatar. */
  shape?: 'circle' | 'square';
  /** Size of the avatar. */
  size?: 'small' | 'medium';
  /** Image source URL. */
  src?: string;
  /** Shows text instead of image or icon. */
  text?: string;
}

type AvatarType = { src: string } | { icon: ReactNode } | { text: string };

type ImageProps = Omit<HTMLAttributes<HTMLImageElement>, 'src'>;

export type AvatarProps = (HTMLAttributes<HTMLDivElement> & AvatarVariants) &
  AvatarType & {
    /** Alternative text for image. */
    alt?: string;
    /** Custom HTML image props. */
    imgProps?: ImageProps;
  };

const Root = ({
  size = 'medium',
  shape = 'circle',
  elevated = false,
  className,
  badge,
  src,
  icon,
  text,
  imgProps = {},
  ...rest
}: AvatarProps) => (
  <div
    className={clsxMerge(
      "bg-[url('https://tailframes.com/images/avatar.webp')] bg-cover bg-no-repeat",
      avatarVariants({
        size,
        shape,
        badge: Boolean(badge),
        image: Boolean(src),
        text: Boolean(text),
        icon: Boolean(icon),
        elevated,
      }),
      className
    )}
    {...rest}
  >
    {!icon && !text && (
      <img src={src ?? 'https://tailframes.com/images/avatar.webp'} alt='' className='aspect-square' {...imgProps} />
    )}
    {icon && !text && <div className={avatarIconVariants({ size })}>{icon}</div>}
    {text && !icon && <span className={avatarTextVariants({ size })}>{text}</span>}
  </div>
);

export function Avatar(props: AvatarProps) {
  if (!props.badge) {
    return <Root {...props} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, size, shape, badge, src, icon, text, imgProps = {}, ...rest } = props;

  return (
    <div className='relative size-min' {...rest}>
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
