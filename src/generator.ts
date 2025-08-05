import path from 'path';
import {
  DEFAULT_BASE_FONT_SIZE,
  DEFAULT_ICONS_CONFIG,
  DEFAULT_PREFIX,
  DEFAULT_ROOT_SCALER_CONFIG,
  DEFAULT_SCROLLBAR_CONFIG,
  DEFAULT_TOKENS_CONFIG
} from './configs.js';
import * as services from './services/index.js';
import type { GeneratorConfig, ServiceFunction } from './types/index.js';

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - baseFontSize: Base font size for the design system
// - services: Configuration data for the services
export async function generateDesignEssentials(config: GeneratorConfig): Promise<void> {
  const {
    buildPath,
    prefix = DEFAULT_PREFIX,
    baseFontSize = DEFAULT_BASE_FONT_SIZE,
    services: { favicons, fontFaces, icons, rootScaler, scrollbar, tokens }
  } = config;

  // This resolvedServiceConfigs object is defined to provide space for logical modifications
  // in the service configurations, as it is necessary to determine the buildPath for favicons
  const resolvedServiceConfigs = {
    favicons: favicons
      ? {
          ...favicons,
          // Resolve the output path for favicons:
          // if no specific build path for favicons is provided,
          // use the default build path and append the "favicons" directory to it
          outputPath: favicons.outputPath || path.join(buildPath, 'favicons')
        }
      : undefined,

    fontFaces:
      fontFaces || process.env.FONTS_PATH
        ? {
            path: fontFaces?.path || process.env.FONTS_PATH || ''
          }
        : undefined,

    icons: icons
      ? {
          ...DEFAULT_ICONS_CONFIG,
          ...icons
        }
      : undefined,

    rootScaler: rootScaler
      ? {
          ...DEFAULT_ROOT_SCALER_CONFIG,
          ...rootScaler
        }
      : undefined,

    scrollbar: scrollbar
      ? {
          ...DEFAULT_SCROLLBAR_CONFIG,
          ...scrollbar
        }
      : undefined,

    tokens: tokens
      ? {
          ...DEFAULT_TOKENS_CONFIG,
          ...tokens
        }
      : undefined
  };

  await Promise.all(
    Object.entries(services)
      .filter(([serviceName]) =>
        Object.keys(resolvedServiceConfigs)
          .map((configName) => `${configName}Service`)
          .includes(serviceName)
      )
      .map(([serviceName, service]) => {
        const name = serviceName.replace('Service', '') as keyof typeof resolvedServiceConfigs;
        const config = resolvedServiceConfigs[name];

        if (config) {
          return (service as ServiceFunction<typeof config>)({
            name,
            buildPath,
            prefix,
            baseFontSize,
            tokensPath: resolvedServiceConfigs.tokens?.sourcePath,
            ...config
          });
        }

        return Promise.resolve();
      })
  );
}
