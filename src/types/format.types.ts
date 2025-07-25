import { Format, FormatFnArguments, TransformedToken } from 'style-dictionary/types';

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

export type TokenTypeHandlerParams = {
  options?: FormatFnArguments['options'];
  tokens: TransformedToken[];
  config?: {
    noChapterTitle?: boolean;
    prefix?: string;
  };
};

export type BasicHandlerParams = {
  name: string;
  params: TokenTypeHandlerParams;
  wrapper: (params: CodeBlockWrapperParams) => string;
  definer: (params: CodeBlockContentParams) => string;
};

export type CoreTokenHandlers = Record<string, (params: TokenTypeHandlerParams) => Promise<string>>;

export type FormatHandler = (name: string, params: TokenTypeHandlerParams) => string;

export type FormatBuilder = () => Format;

export enum CustomFormatter {
  CSS = 'css',
  SCSS = 'scss',
  JS = 'js'
}

export enum JsFormatterType {
  STATIC = 'static',
  VARIABLE = 'variable'
}
