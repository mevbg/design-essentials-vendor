import { Format, FormatFnArguments, TransformedToken } from 'style-dictionary/types';

export type FormatBuilder = () => Format;

export type TokenTypeHandlerParams = {
  options?: FormatFnArguments['options'];
  tokens: TransformedToken[];
  config?: {
    noChapterTitle?: boolean;
    prefix?: string;
  };
};

export type CoreTokenHandlers = Record<string, (params: TokenTypeHandlerParams) => Promise<string>>;

export type FormatHandler = (name: string, params: TokenTypeHandlerParams) => string;

export enum CustomFormatter {
  CSS = 'css',
  SCSS = 'scss',
  JS = 'js'
}

export enum JsFormatterType {
  STATIC = 'static',
  VARIABLE = 'variable'
}

export type CodeBlockWrapperParams = {
  code: string;
  name?: string;
  indent?: string;
};

export type CodeBlockContentParams = {
  tokens: TransformedToken[];
  options?: FormatFnArguments['options'];
  indent?: string;
};
