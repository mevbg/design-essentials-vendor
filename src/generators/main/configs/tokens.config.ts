/* =================================================== */
/* TOKENS → CONFIG PARSER */
/* =================================================== */

import { GeneratorCommonParams, GeneratorConfigParserFn } from '../../../types/generator.types.js';
import { TokensConfig } from '../../../types/index.js';
import { tokensGenerator } from '../../tokens/tokens.generator.js';

export const tokensConfigParser: GeneratorConfigParserFn<TokensConfig> = (
  userConfig: {
    sourcePath: TokensConfig['sourcePath'];
  } & Partial<Omit<TokensConfig, 'sourcePath' | keyof GeneratorCommonParams>>,
  { buildPath, prefix, baseFontSize }: GeneratorCommonParams
) =>
  userConfig
    ? {
        config: {
          ...userConfig,
          buildPath,
          prefix,
          baseFontSize
        } as TokensConfig,
        generator: tokensGenerator
      }
    : undefined;
