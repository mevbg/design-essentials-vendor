/* =================================================== */
/* SCROLLBAR → PROXY GENERATOR */
/* =================================================== */

import { GeneratorCommonParams, ProxyGeneratorFn } from '../../../types/generator.types.js';
import { ScrollbarGeneratorParams } from '../../../types/index.js';
import { scrollbarGenerator } from '../../scrollbar/scrollbar.generator.js';

export const scrollbarProxyGenerator: ProxyGeneratorFn<ScrollbarGeneratorParams> = (
  userParams: ScrollbarGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? scrollbarGenerator({
        ...userParams,
        ...(userParams.buildPath
          ? { buildPath: userParams.buildPath }
          : commonParams.buildPath
            ? { buildPath: commonParams.buildPath + '/css' }
            : {})
      })
    : undefined;
