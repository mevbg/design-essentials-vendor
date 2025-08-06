/* =================================================== */
/* FONT FACES → PROXY GENERATOR */
/* =================================================== */

import { GeneratorCommonParams, ProxyGeneratorFn } from '../../../types/generator.types.js';
import { FontFacesGeneratorParams } from '../../../types/index.js';
import { fontFacesGenerator } from '../../font-faces/font-faces.generator.js';

export const fontFacesProxyGenerator: ProxyGeneratorFn<FontFacesGeneratorParams> = (
  userParams: FontFacesGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? fontFacesGenerator({
        ...userParams,
        ...(userParams.buildPath
          ? { buildPath: userParams.buildPath }
          : commonParams.buildPath
            ? { buildPath: commonParams.buildPath + '/css' }
            : {})
      })
    : undefined;
