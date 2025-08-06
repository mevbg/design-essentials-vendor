/* =================================================== */
/* ROOT SCALER → CONFIG PARSER */
/* =================================================== */

import { DEFAULT_ROOT_SCALER_CONFIG } from '../../../defaults.js';
import { RootScalerConfig } from '../../../types/index.js';
import { ServiceCommonParams, ServiceConfigParserFn } from '../../../types/services.types.js';
import { rootScalerGenerator } from '../../root-scaler/root-scaler.generator.js';

export const rootScalerConfigParser: ServiceConfigParserFn<RootScalerConfig> = (
  userConfig: Omit<RootScalerConfig, 'baseFontSize'>,
  { buildPath, prefix, baseFontSize }: ServiceCommonParams
) =>
  userConfig
    ? {
        config: {
          ...DEFAULT_ROOT_SCALER_CONFIG,
          ...userConfig,
          buildPath,
          prefix,
          baseFontSize
        },
        generator: rootScalerGenerator
      }
    : undefined;
