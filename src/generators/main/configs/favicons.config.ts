/* =================================================== */
/* FAVICONS → CONFIG PARSER */
/* =================================================== */

import type { FaviconResponse } from 'favicons';
import path from 'path';
import { GeneratorCommonParams, GeneratorConfigParserFn } from '../../../types/generator.types.js';
import { FaviconsConfig } from '../../../types/index.js';
import { faviconsGenerator } from '../../favicons/favicons.generator.js';

export const faviconsConfigParser: GeneratorConfigParserFn<FaviconsConfig, FaviconResponse> = (
  userConfig: FaviconsConfig,
  { buildPath }: GeneratorCommonParams
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
