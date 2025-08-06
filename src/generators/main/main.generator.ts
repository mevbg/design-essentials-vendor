import { mainGeneratorDefaultParams } from '../../defaults.js';
import * as generatorProxies from './proxies/index.js';

import type { GeneratorProxyFn } from '../../types/index.js';
import type { MainGeneratorParams } from './main.types.js';

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - baseFontSize: Base font size for the design system
// - generators: Configuration data for the generators
export async function generateDesignEssentials(params: MainGeneratorParams = {}): Promise<void> {
  const { buildPath, prefix, baseFontSize, generators } = params;

  const selectedGenerators = generators || mainGeneratorDefaultParams.generators;

  if (!selectedGenerators || !Object.keys(selectedGenerators).length) {
    return Promise.reject(new Error('No generators selected.'));
  }

  await Promise.all(
    Object.entries(selectedGenerators)
      .filter(([, generatorValue]) => !!generatorValue)
      .map(([name, config]) => {
        const generatorGeneratorProxy = (
          generatorProxies as Record<string, GeneratorProxyFn<unknown, unknown>>
        )[`${name}GeneratorProxy`];

        if (!generatorGeneratorProxy) {
          throw new Error(`Generator config parser for ${name} not found`);
        }

        const parsedGenerator = generatorGeneratorProxy(config, {
          buildPath,
          prefix,
          baseFontSize
        });

        if (!parsedGenerator) {
          throw new Error(`Generator config parser for ${name} not found`);
        }

        const { config: generatorConfig, generator } = parsedGenerator;

        return generator(generatorConfig as unknown);
      })
  );
}
