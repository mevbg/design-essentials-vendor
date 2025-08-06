/* =================================================== */
/* FAVICONS → PROXY GENERATOR */
/* =================================================== */

import type { FaviconResponse } from 'favicons';
import { GeneratorCommonParams, ProxyGeneratorFn } from '../../../types/generator.types.js';
import { FaviconsGeneratorParams } from '../../../types/index.js';
import { faviconsGenerator } from '../../favicons/favicons.generator.js';

export const faviconsProxyGenerator: ProxyGeneratorFn<FaviconsGeneratorParams, FaviconResponse> = (
  userParams: FaviconsGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? faviconsGenerator({
        ...userParams,
        ...(userParams.buildPath
          ? { buildPath: userParams.buildPath }
          : commonParams.buildPath
            ? { buildPath: commonParams.buildPath + '/favicons' }
            : {})
      })
    : undefined;
