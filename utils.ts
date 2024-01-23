import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const clsxMerge = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const kebabCase = (value: string) =>
  value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
