/* =================================================== */
/* ROOT SCALER → CONFIG PARSER */
/* =================================================== */

import { GeneratorCommonParams, GeneratorConfigParserFn } from '../../../types/generator.types.js';
import { RootScalerConfig } from '../../../types/index.js';
import { rootScalerGenerator } from '../../root-scaler/root-scaler.generator.js';

export const rootScalerConfigParser: GeneratorConfigParserFn<RootScalerConfig> = (
  userConfig: Omit<RootScalerConfig, 'baseFontSize'>,
  { buildPath, prefix, baseFontSize }: GeneratorCommonParams
) =>
  userConfig
    ? {
        config: {
          ...userConfig,
          buildPath,
          prefix,
          baseFontSize
        },
        generator: rootScalerGenerator
      }
    : undefined;
