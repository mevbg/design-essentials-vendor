/* =================================================== */
/* FONT FACES → CONFIG PARSER */
/* =================================================== */

import { FontFacesConfig } from '../../../types/index.js';
import { ServiceCommonParams, ServiceConfigParserFn } from '../../../types/services.types.js';
import { fontFacesGenerator } from '../../font-faces/font-faces.generator.js';

export const fontFacesConfigParser: ServiceConfigParserFn<FontFacesConfig> = (
  userConfig: FontFacesConfig,
  { buildPath }: ServiceCommonParams
) =>
  userConfig
    ? {
        config: {
          ...userConfig,
          buildPath
        },
        generator: fontFacesGenerator
      }
    : undefined;
