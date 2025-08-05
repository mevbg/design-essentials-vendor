import path from 'path';
import { DEFAULT_BASE_FONT_SIZE, DEFAULT_PREFIX } from './configs.js';
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
    services: serviceConfigs
  } = config;

  // This resolvedServiceConfigs object is defined to provide space for logical modifications
  // in the service configurations, as it is necessary to determine the buildPath for favicons
  const resolvedServiceConfigs = {
    ...serviceConfigs,

    // Resolve the build path for favicons:
    // if no specific build path for favicons is provided,
    // use the default build path and append the "favicons" directory to it
    favicons: serviceConfigs.favicons && {
      ...serviceConfigs.favicons,
      outputPath: serviceConfigs.favicons.outputPath || path.join(buildPath, 'favicons')
    }
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
            buildPath,
            prefix,
            baseFontSize,
            ...config
          });
        }
        return Promise.resolve();
      })
  );
}
