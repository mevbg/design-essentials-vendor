import { Format } from 'style-dictionary/types';
import { TokenTypeHandlerParams } from './token.types';

export type CustomFormatTypes = 'css' | 'scss' | 'js';

export type FormatBuilder = () => Format;

export type FormatHandler = (name: string, params: TokenTypeHandlerParams) => string;
