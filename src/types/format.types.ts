import { Format, FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import {
  CommonPlatformFileType,
  CssPlatformFileType,
  JsPlatformFileType,
  PlatformType
} from './platform.types.js';
import { CoreToken } from './tokens.types.js';

export type HandlerConfig = {
  noChapterTitle?: boolean;
  prefix?: string;
};

export type HandlerResolver = (
  formatArgs: FormatFnArguments,
  tokens: TransformedToken[],
  config?: HandlerConfig
) => Promise<string>;

export type CoreTokensHandlerResolvers = Record<CoreToken, HandlerResolver>;

export enum CustomFormatterCategory {
  CSS = PlatformType.CSS,
  SCSS = PlatformType.SCSS,
  JS = PlatformType.JS
}

export enum CssCustomFormatterType {
  ALL = CommonPlatformFileType.ALL,
  CORE = CommonPlatformFileType.CORE,
  OTHERS = CommonPlatformFileType.OTHERS,
  ROOT_FONT_SIZE = CssPlatformFileType.ROOT_FONT_SIZE
}

export enum ScssCustomFormatterType {
  ALL = CommonPlatformFileType.ALL,
  CORE = CommonPlatformFileType.CORE,
  OTHERS = CommonPlatformFileType.OTHERS
}

export enum JsCustomFormatterType {
  STATIC = JsPlatformFileType.STATIC,
  VARIABLE = JsPlatformFileType.VARIABLE
}

// Defines the type of custom formatter
export type CustomFormatterType =
  | CssCustomFormatterType
  | ScssCustomFormatterType
  | JsCustomFormatterType;

// Defines the parameters for the functions
// that represents common handlers of tokens for any of the custom formatters
export type CommonHandlerParams = {
  name: string;
  category: CustomFormatterCategory;
  type?: CustomFormatterType;
  formatArgs: FormatFnArguments;
  tokens: TransformedToken[];
  config?: HandlerConfig;
};

// Defines the parameters for the functions that wrap code blocks
export type WrapperParams = {
  code: string;
  name?: string;
  indent?: string;
};

// Defines the parameters for the functions that define code blocks content
export type DefinerParams = {
  type?: CustomFormatterType;
  tokens: TransformedToken[];
  options?: FormatFnArguments['options'];
  indent?: string;
};

export type FormatterTemplateFn = (params: {
  name: string;
  category: CustomFormatterCategory;
  type?: CustomFormatterType;
  prefixOutput?: (output: string[], formatArgs: FormatFnArguments) => void;
}) => Format;
