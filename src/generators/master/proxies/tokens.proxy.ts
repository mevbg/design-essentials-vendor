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
          ...(userParams.buildPath
            ? { buildPath: userParams.buildPath }
            : commonParams.buildPath
              ? { buildPath: commonParams.buildPath + '/tokens' }
              : {}),
          ...(userParams.prefix || commonParams.prefix
            ? { prefix: userParams.prefix || commonParams.prefix }
            : {}),
          ...(userParams.baseFontSize || commonParams.baseFontSize
            ? { baseFontSize: userParams.baseFontSize || commonParams.baseFontSize }
            : {})
        },
        generator: tokensGenerator
      }
    : undefined;
