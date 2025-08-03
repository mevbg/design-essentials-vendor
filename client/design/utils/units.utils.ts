import { BASE_FONT_SIZE } from '../constants/typography.constants';

// Converts a given number to pixel unit
export const px = (value: number): string => `${value}px`;

// Converts a given number to rem unit
export const rem = (value: number): string => `${value / BASE_FONT_SIZE}rem`;
