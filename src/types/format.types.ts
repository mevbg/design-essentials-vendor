import { Format, FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { CoreToken } from './tokens.types.js';

export type CodeBlockWrapperParams = {
  code: string;
  name?: string;
  indent?: string;
};

export type CodeBlockContentParams = {
  type?: JsFormatterType;
  tokens: TransformedToken[];
  options?: FormatFnArguments['options'];
  indent?: string;
};

export type HandlerConfig = {
  noChapterTitle?: boolean;
  prefix?: string;
};

export type HandlerResolver = (
  formatArgs: FormatFnArguments,
  tokens: TransformedToken[],
  config?: {
    noChapterTitle?: boolean;
    prefix?: string;
  }
) => Promise<string>;

export type CoreTokensHandlerResolvers = Record<CoreToken, HandlerResolver>;

export type FormatBuilder = () => Format;

export enum CustomFormatterCategory {
  CSS = 'css',
  SCSS = 'scss',
  JS = 'js'
}

export enum JsFormatterType {
  STATIC = 'static',
  VARIABLE = 'variable'
}

export type CustomFormatterType = JsFormatterType;

export type GeneralHandlerParams = {
  name: string;
  category: CustomFormatterCategory;
  type?: CustomFormatterType;
  formatArgs: FormatFnArguments;
  tokens: TransformedToken[];
  config?: HandlerConfig;
};
