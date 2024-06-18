import React from 'react';
import { ArgTypes } from '@storybook/react';
import { SVGProps } from 'react';
import { CheckIcon } from '../assets/check-icon';
import { CheckboxIcon } from '../assets/checkbox-icon';
import { CircleCloseIcon } from '../assets/circle-close-icon';
import { CircleExclamationMarkIcon } from '../assets/circle-exclamation-mark-icon';
import { CloseIcon } from '../assets/close-icon';
import { StarIcon } from '../assets/star-icon';
import { UserIcon } from '../assets/user-icon';

export enum IconKey {
  CheckIcon = 'CheckIcon',
  CloseIcon = 'CloseIcon',
  StarIcon = 'StarIcon',
  UserIcon = 'UserIcon',
  CheckboxIcon = 'CheckboxIcon',
  CircleCloseIcon = 'CircleCloseIcon',
  CircleExclamationMarkIcon = 'CircleExclamationMarkIcon',
}

export const Icons: (iconProps: SVGProps<SVGSVGElement>) => Record<IconKey, React.ReactNode> = ({
  className,
  ...iconProps
}: SVGProps<SVGSVGElement> = {}) => ({
  CheckIcon: <CheckIcon className={className} {...iconProps} />,
  CloseIcon: <CloseIcon className={className} {...iconProps} />,
  StarIcon: <StarIcon className={className} {...iconProps} />,
  UserIcon: <UserIcon className={className} {...iconProps} />,
  CheckboxIcon: <CheckboxIcon className={className} {...iconProps} />,
  CircleCloseIcon: <CircleCloseIcon className={className} {...iconProps} />,
  CircleExclamationMarkIcon: <CircleExclamationMarkIcon className={className} {...iconProps} />,
});

export const IconsKeys = Object.keys(Icons({})) as IconKey[];

export const IconArgType: (iconSVGProps: SVGProps<SVGSVGElement>, iconKeys?: IconKey[]) => ArgTypes = (
  iconSVGProps,
  iconKeys
) => ({
  options: IconsKeys.filter(key => (iconKeys ? iconKeys.includes(key) : true)),
  mapping: Icons(iconSVGProps),
});
