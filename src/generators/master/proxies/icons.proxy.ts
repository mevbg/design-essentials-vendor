/* =================================================== */
/* ICONS → PROXY GENERATOR */
/* =================================================== */

import { GeneratorCommonParams, ProxyGeneratorFn } from '../../../types/generator.types.js';
import { IconsGeneratorParams } from '../../../types/index.js';
import { iconsGenerator } from '../../icons/icons.generator.js';

export const iconsProxyGenerator: ProxyGeneratorFn<IconsGeneratorParams> = (
  userParams: IconsGeneratorParams,
  commonParams: GeneratorCommonParams
) =>
  userParams
    ? iconsGenerator({
        ...userParams,
        ...(userParams.buildPath
          ? { buildPath: userParams.buildPath }
          : commonParams.buildPath
            ? { buildPath: commonParams.buildPath + '/css' }
            : {})
      })
    : undefined;
