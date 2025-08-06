/* =================================================== */
/* ICONS → GENERATOR PROXY */
/* =================================================== */

import { GeneratorCommonParams, GeneratorProxyFn } from '../../../types/generator.types.js';
import { IconsGeneratorParams } from '../../../types/index.js';
import { iconsGenerator } from '../../icons/icons.generator.js';

export const iconsGeneratorProxy: GeneratorProxyFn<IconsGeneratorParams> = (
  userParams: IconsGeneratorParams,
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
        generator: iconsGenerator
      }
    : undefined;
