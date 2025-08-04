import { PlatformConfig } from 'style-dictionary/types';
import type { DesignConfig } from './design.types.js';
import { CoreTokenKebabValues } from './tokens.types.js';

//
// ------------------------------------------------------------
// PLATFORM TYPES

// This enum contains the types of platforms that are supported.
export enum PlatformType {
  CSS = 'css',
  SCSS = 'scss',
  JS = 'js',
  JSON = 'json'
}

//
// ------------------------------------------------------------
// PLATFORM CONTEXT

// This type defines the platform context that is returned by the platform context getter.
export type PlatformContext = {
  // the platform config
  config: PlatformConfig;

  // determines if the platform needs a file with all tokens
  allTokensFile?: boolean;

  // determines if the platform needs separate token type files,
  // including "others" (if such, not in the core list)
  tokenTypeFiles?: boolean;

  // determines if the platform needs any other files,
  // such as root font size, etc.
  customFiles?: string[];
};

// This type defines the function that returns the platform context.
export type PlatformContextGetter = (params: {
  designConfig: DesignConfig;
  prefix?: string;
}) => PlatformContext;

//
// ------------------------------------------------------------
// FILE TYPES

// This type determines the common file types for CSS & SCSS platforms
export enum CommonPlatformFileType {
  // file that contains all tokens
  ALL = 'all',

  // individual files for each token type in the core list
  CORE = 'core',

  // conditional file that depends on whether a token type that is not in the core list is used
  OTHERS = 'others'
}

// This type determines the custom file types for the CSS platform
export enum CssCustomPlatformFileType {
  ROOT_FONT_SIZE = 'root-font-size',
  FONT_FACES = 'font-faces',
  ICONOGRAPHY = 'iconography',
  SCROLLBAR = 'scrollbar'
}

// This type determines the custom file types for the JS platform
export enum JsCustomPlatformFileType {
  // file that contains all tokens with printed static values
  STATIC = 'static',

  // file that contains all tokens with printed CSS custom properties as values
  VARIABLE = 'variable'
}

//
// ------------------------------------------------------------
// FILE NAMES

// This type contains the names of all possible output files for the CSS platform
type CssPlatformFilename =
  | CommonPlatformFileType.ALL
  | CommonPlatformFileType.OTHERS
  | CssCustomPlatformFileType.ROOT_FONT_SIZE
  | CoreTokenKebabValues;

// This type contains the names of all possible output files for the SCSS platform
type ScssPlatformFilename =
  | CommonPlatformFileType.ALL
  | CommonPlatformFileType.OTHERS
  | CoreTokenKebabValues;

// This type contains the names of all possible output files for the JS platform
type JsPlatformFilename = JsCustomPlatformFileType.STATIC | JsCustomPlatformFileType.VARIABLE;

// This type contains the names of all possible output files for the JSON platform
type JsonPlatformFilename = CommonPlatformFileType.ALL;

// This type contains the names of all possible output files for all platforms
export type PlatformFilename =
  | CssPlatformFilename
  | ScssPlatformFilename
  | JsPlatformFilename
  | JsonPlatformFilename;
