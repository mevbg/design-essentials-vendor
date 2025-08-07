/* =================================================== */
/* TOKENS → TYPES → FORMATS */
/* =================================================== */

import type { Format, FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { CommonPlatformFileType, JsCustomPlatformFileType } from './platform.types.js';
import { CoreToken } from './tokens.types.js';

//
// ---------------------------------------------------
// CUSTOM FORMATTER CATEGORIES

// This enum contains the categories of custom formatters.
export enum CustomFormatterCategory {
  CSS = 'css',
  SCSS = 'scss',
  JS = 'js'
}

//
// ---------------------------------------------------
// CUSTOM FORMATTER TYPES

// This enum contains the types of custom formatters.
export enum CssCustomFormatterType {
  ALL = CommonPlatformFileType.ALL,
  CORE = CommonPlatformFileType.CORE,
  OTHERS = CommonPlatformFileType.OTHERS
}

export enum ScssCustomFormatterType {
  ALL = CommonPlatformFileType.ALL,
  CORE = CommonPlatformFileType.CORE,
  OTHERS = CommonPlatformFileType.OTHERS
}

export enum JsCustomFormatterType {
  STATIC = JsCustomPlatformFileType.STATIC,
  VARIABLE = JsCustomPlatformFileType.VARIABLE
}

// Defines the type of custom formatter
export type CustomFormatterType =
  | CssCustomFormatterType
  | ScssCustomFormatterType
  | JsCustomFormatterType;

//
// ---------------------------------------------------
// FORMATTING TEMPLATE FUNCTIONS

// This type defines the template function for the custom formatters.
export type FormatterTemplateFn = (params: {
  name: string;
  category: CustomFormatterCategory;
  type?: CustomFormatterType;
}) => Format;

//
// ---------------------------------------------------
// OUTPUT CONFIG

// This type defines the configuration for the output of the tokens.
export type OutputConfig = {
  noChapterTitle?: boolean;
  prefix?: string;
};

//
// ---------------------------------------------------
// HANDLERS

// This type defines the resolver for the handler of the tokens.
export type HandlerResolver = (
  formatArgs: FormatFnArguments,
  tokens: TransformedToken[],
  config?: OutputConfig
) => Promise<string>;

// This type defines the resolvers for the handlers of the tokens.
export type CoreTokensHandlerResolvers = Record<CoreToken, HandlerResolver>;

// Defines the parameters for the functions
// that represents common handlers of tokens for any of the custom formatters
export type CommonHandlerParams = {
  name: string;
  category: CustomFormatterCategory;
  type?: CustomFormatterType;
  formatArgs: FormatFnArguments;
  tokens: TransformedToken[];
  config?: OutputConfig;
};

//
// ---------------------------------------------------
// OUTPUT HANDLER TYPES

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
