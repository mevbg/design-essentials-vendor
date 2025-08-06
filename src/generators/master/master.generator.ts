/* =================================================== */
/* MASTER → GENERATOR */
/* =================================================== */

import type { GeneratorProxyFn } from '../../types/index.js';
import type { MasterGeneratorParams } from './master.types.js';
import * as generatorProxies from './proxies/index.js';

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - baseFontSize: Base font size for the design system
// - generators: Configuration data for the generators
export async function generateDesignEssentials(params: MasterGeneratorParams): Promise<void> {
  const { buildPath, prefix, baseFontSize, generators } = params;

  if (!generators || !Object.keys(generators).length) {
    return Promise.reject(new Error('No generators selected.'));
  }

  await Promise.all(
    Object.entries(generators)
      .filter(([, generatorValue]) => !!generatorValue)
      .map(([name, config]) => {
        const generatorProxy = (
          generatorProxies as Record<string, GeneratorProxyFn<unknown, unknown>>
        )[`${name}GeneratorProxy`];

        if (!generatorProxy) {
          throw new Error(`Generator config parser for ${name} not found`);
        }

        const parsedGenerator = generatorProxy(config, {
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
