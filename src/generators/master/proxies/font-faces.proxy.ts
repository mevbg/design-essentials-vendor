/* =================================================== */
/* FONT FACES → GENERATOR PROXY */
/* =================================================== */

import { GeneratorCommonParams, GeneratorProxyFn } from '../../../types/generator.types.js';
import { FontFacesGeneratorParams } from '../../../types/index.js';
import { fontFacesGenerator } from '../../font-faces/font-faces.generator.js';

export const fontFacesGeneratorProxy: GeneratorProxyFn<FontFacesGeneratorParams> = (
  userParams: FontFacesGeneratorParams,
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
              : {})
        },
        generator: fontFacesGenerator
      }
    : undefined;
