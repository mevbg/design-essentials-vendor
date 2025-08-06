/* =================================================== */
/* ROOT SCALER → GENERATOR PROXY */
/* =================================================== */

import { GeneratorCommonParams, GeneratorProxyFn } from '../../../types/generator.types.js';
import { RootScalerGeneratorParams } from '../../../types/index.js';
import { rootScalerGenerator } from '../../root-scaler/root-scaler.generator.js';

export const rootScalerGeneratorProxy: GeneratorProxyFn<RootScalerGeneratorParams> = (
  userParams: RootScalerGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? {
        config: {
          ...userParams,
          ...(userParams.buildPath
            ? { buildPath: userParams.buildPath }
            : commonParams.buildPath
              ? { buildPath: commonParams.buildPath + '/css' }
              : {}),
          ...(userParams.prefix || commonParams.prefix
            ? { prefix: userParams.prefix || commonParams.prefix }
            : {}),
          ...(userParams.baseFontSize || commonParams.baseFontSize
            ? { baseFontSize: userParams.baseFontSize || commonParams.baseFontSize }
            : {})
        },
        generator: rootScalerGenerator
      }
    : undefined;
