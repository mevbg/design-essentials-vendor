import { PlatformConfig } from 'style-dictionary/types';
import { DesignData } from './generator.types.js';
import { CoreTokenKebabValues } from './tokens.types.js';

export enum PlatformType {
  CSS = 'css',
  SCSS = 'scss',
  JS = 'js',
  JSON = 'json'
}

export type PlatformConfigsBuilderParams = {
  designData: DesignData;
  prefix?: string;
};

export type PlatformConfigProvider = (params: PlatformConfigsBuilderParams) => {
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

export enum CommonPlatformFileType {
  ALL = 'all',
  CORE = 'core',
  OTHERS = 'others'
}

export enum CssPlatformFileType {
  ROOT_FONT_SIZE = 'root-font-size'
}

export enum JsPlatformFileType {
  STATIC = 'static',
  VARIABLE = 'variable'
}

type CssPlatformFilename =
  | CommonPlatformFileType.ALL
  | CommonPlatformFileType.OTHERS
  | CssPlatformFileType.ROOT_FONT_SIZE
  | CoreTokenKebabValues;

type ScssPlatformFilename =
  | CommonPlatformFileType.ALL
  | CommonPlatformFileType.OTHERS
  | CoreTokenKebabValues;

type JsPlatformFilename = JsPlatformFileType.STATIC | JsPlatformFileType.VARIABLE;

type JsonPlatformFilename = CommonPlatformFileType.ALL;

export type PlatformFilename =
  | CssPlatformFilename
  | ScssPlatformFilename
  | JsPlatformFilename
  | JsonPlatformFilename;
