/* =================================================== */
/* FAVICONS → GENERATOR PROXY */
/* =================================================== */

import type { FaviconResponse } from 'favicons';
import { GeneratorCommonParams, GeneratorProxyFn } from '../../../types/generator.types.js';
import { FaviconsGeneratorParams } from '../../../types/index.js';
import { faviconsGenerator } from '../../favicons/favicons.generator.js';

export const faviconsGeneratorProxy: GeneratorProxyFn<FaviconsGeneratorParams, FaviconResponse> = (
  userParams: FaviconsGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? {
        config: {
          ...userParams,
          ...(userParams.buildPath
            ? { buildPath: userParams.buildPath }
            : commonParams.buildPath
              ? { buildPath: commonParams.buildPath + '/favicons' }
              : {})
        },
        generator: faviconsGenerator
      }
    : undefined;
