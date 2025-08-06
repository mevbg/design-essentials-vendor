/* =================================================== */
/* ROOT SCALER → PROXY GENERATOR */
/* =================================================== */

import { GeneratorCommonParams, ProxyGeneratorFn } from '../../../types/generator.types.js';
import { RootScalerGeneratorParams } from '../../../types/index.js';
import { rootScalerGenerator } from '../../root-scaler/root-scaler.generator.js';

export const rootScalerProxyGenerator: ProxyGeneratorFn<RootScalerGeneratorParams> = (
  userParams: RootScalerGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? rootScalerGenerator({
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
      })
    : undefined;
