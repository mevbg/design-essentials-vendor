/* =================================================== */
/* TOKENS → CONFIG PARSER */
/* =================================================== */

import { DEFAULT_TOKENS_CONFIG } from '../../../defaults.js';
import { TokensConfig } from '../../../types/index.js';
import { ServiceCommonParams, ServiceConfigParserFn } from '../../../types/services.types.js';
import { tokensGenerator } from '../../tokens/tokens.generator.js';

export const tokensConfigParser: ServiceConfigParserFn<TokensConfig> = (
  userConfig: {
    sourcePath: TokensConfig['sourcePath'];
  } & Partial<Omit<TokensConfig, 'sourcePath' | keyof ServiceCommonParams>>,
  { buildPath, prefix, baseFontSize }: ServiceCommonParams
) =>
  userConfig
    ? {
        config: {
          ...DEFAULT_TOKENS_CONFIG,
          ...userConfig,
          buildPath,
          prefix,
          baseFontSize
        } as TokensConfig,
        generator: tokensGenerator
      }
    : undefined;
