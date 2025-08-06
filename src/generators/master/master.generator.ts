/* =================================================== */
/* MASTER → GENERATOR */
/* =================================================== */

import type { ProxyGeneratorFn } from '../../types/index.js';
import type { MasterGeneratorParams } from './master.types.js';
import * as proxyGenerators from './proxies/index.js';

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - baseFontSize: Base font size for the design system
// - generators: Configuration data for the generators
export async function masterGenerator(params: MasterGeneratorParams): Promise<void> {
  const { buildPath, prefix, baseFontSize, generators } = params;

  if (!generators || !Object.keys(generators).length) {
    return Promise.reject(new Error('No generators selected.'));
  }

  await Promise.all(
    Object.entries(generators)
      .filter(([, generatorValue]) => !!generatorValue)
      .map(([name, config]) => {
        const proxyGenerator = (
          proxyGenerators as Record<string, ProxyGeneratorFn<unknown, unknown>>
        )[`${name}ProxyGenerator`];

        if (!proxyGenerator) {
          throw new Error(`Generator config parser for ${name} not found`);
        }

        return proxyGenerator(config, {
          buildPath,
          prefix,
          baseFontSize
        });
      })
  );
}
