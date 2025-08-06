/* =================================================== */
/* SCROLLBAR → GENERATOR PROXY */
/* =================================================== */

import { GeneratorCommonParams, GeneratorProxyFn } from '../../../types/generator.types.js';
import { ScrollbarGeneratorParams } from '../../../types/index.js';
import { scrollbarGenerator } from '../../scrollbar/scrollbar.generator.js';

export const scrollbarGeneratorProxy: GeneratorProxyFn<ScrollbarGeneratorParams> = (
  userParams: ScrollbarGeneratorParams,
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
        generator: scrollbarGenerator
      }
    : undefined;
