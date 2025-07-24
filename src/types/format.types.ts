import { Format } from 'style-dictionary/types';

export type CustomFormatTypes = 'css' | 'scss' | 'js';

export type FormatBuilder = () => Format;
