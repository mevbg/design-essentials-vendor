/* =================================================== */
/* FAVICONS → CONFIG PARSER */
/* =================================================== */

import type { FaviconResponse } from 'favicons';
import path from 'path';
import { FaviconsConfig } from '../../../types/index.js';
import { ServiceCommonParams, ServiceConfigParserFn } from '../../../types/services.types.js';
import { faviconsGenerator } from '../../favicons/favicons.generator.js';

export const faviconsConfigParser: ServiceConfigParserFn<FaviconsConfig, FaviconResponse> = (
  userConfig: FaviconsConfig,
  { buildPath }: ServiceCommonParams
) =>
  userConfig
    ? {
        config: {
          ...userConfig,
          // Resolve the output path for favicons:
          // if no specific build path for favicons is provided,
          // use the default build path and append the "favicons" directory to it
          outputPath: userConfig.outputPath || path.join(buildPath, 'favicons')
        },
        generator: faviconsGenerator
      }
    : undefined;
