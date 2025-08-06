import { DEFAULT_BASE_FONT_SIZE, DEFAULT_PREFIX } from '../../defaults.js';
import * as serviceConfigParsers from './configs/index.js';

import type { GeneratorConfig, ServiceConfigParserFn, ServiceParams } from '../../types/index.js';

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
    services
  } = config;

  await Promise.all(
    Object.entries(services)
      .filter(([, serviceValue]) => !!serviceValue)
      .map(([name, config]) => {
        const serviceConfigParser = (
          serviceConfigParsers as Record<string, ServiceConfigParserFn<unknown, unknown>>
        )[`${name}ConfigParser`];

        if (!serviceConfigParser) {
          throw new Error(`Service config parser for ${name} not found`);
        }

        const parsedService = serviceConfigParser(config, {
          buildPath,
          prefix,
          baseFontSize
        });

        if (!parsedService) {
          throw new Error(`Service config parser for ${name} not found`);
        }

        const { config: serviceConfig, generator } = parsedService;

        return generator(serviceConfig as ServiceParams<unknown>);
      })
  );
}
