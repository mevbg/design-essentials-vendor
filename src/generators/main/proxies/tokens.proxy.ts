/* =================================================== */
/* TOKENS → GENERATOR PROXY */
/* =================================================== */

import { GeneratorCommonParams, GeneratorProxyFn } from '../../../types/generator.types.js';
import { TokensGeneratorParams } from '../../../types/index.js';
import { tokensGenerator } from '../../tokens/tokens.generator.js';

export const tokensGeneratorProxy: GeneratorProxyFn<TokensGeneratorParams> = (
  userParams: TokensGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? {
        config: {
          ...userParams,
          buildPath: userParams.buildPath || commonParams.buildPath,
          prefix: userParams.prefix || commonParams.prefix,
          baseFontSize: userParams.baseFontSize || commonParams.baseFontSize
        },
        generator: tokensGenerator
      }
    : undefined;
