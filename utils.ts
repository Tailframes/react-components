import clsx, { type ClassValue } from 'clsx';
import { type KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';

export const clsxMerge = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const kebabCase = (value: string) =>
  value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

export const handleKeyboardEvent =
  <Type = Element>(key: KeyboardEvent['key'] | Array<KeyboardEvent['key']>, callback: () => void) =>
  (event: KeyboardEvent<Type>) => {
    const keys = Array.isArray(key) ? key : [key];

    if (keys.includes(event.key)) {
      callback();
    }
  };
