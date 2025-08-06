import { DEFAULT_TOKENS_CONFIG } from '../../defaults.js';
import * as serviceConfigParsers from './configs/index.js';

import type { GeneratorConfigParserFn, GeneratorParams } from '../../types/index.js';
import type { MainGeneratorConfig } from './main.types.js';

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - baseFontSize: Base font size for the design system
// - services: Configuration data for the services
export async function generateDesignEssentials(config: MainGeneratorConfig): Promise<void> {
  const { buildPath, prefix, baseFontSize, services } = {
    ...DEFAULT_TOKENS_CONFIG,
    ...config
  } as Required<MainGeneratorConfig>;

  await Promise.all(
    Object.entries(services)
      .filter(([, serviceValue]) => !!serviceValue)
      .map(([name, config]) => {
        const serviceConfigParser = (
          serviceConfigParsers as Record<string, GeneratorConfigParserFn<unknown, unknown>>
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

        return generator(serviceConfig as GeneratorParams<unknown>);
      })
  );
}
