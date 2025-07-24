import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';

export type TokenTypeHandlerParams = {
  options?: FormatFnArguments['options'];
  tokens: TransformedToken[];
  config?: {
    noChapterTitle?: boolean;
    prefix?: string;
  };
};

export type CoreTokenHandlers = Record<string, (params: TokenTypeHandlerParams) => Promise<string>>;
