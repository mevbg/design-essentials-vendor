/* =================================================== */
/* MASTER → GENERATOR */
/* =================================================== */

import { GeneratorCommonParams } from '../../types/generator.types.js';
import * as generators from '../index.js';
import type { MasterGeneratorParams } from './master.types.js';

const generatorConfigs: Record<
  string,
  { commonParams: Array<keyof GeneratorCommonParams>; dir: string }
> = {
  favicons: { commonParams: ['buildPath'], dir: 'favicons' },
  fontFaces: { commonParams: ['buildPath'], dir: 'css' },
  icons: { commonParams: ['buildPath'], dir: 'css' },
  scrollbar: { commonParams: ['buildPath'], dir: 'css' },
  rootScaler: { commonParams: ['buildPath', 'prefix', 'baseFontSize'], dir: 'css' },
  tokens: { commonParams: ['buildPath', 'prefix', 'baseFontSize'], dir: 'tokens' }
};

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - baseFontSize: Base font size for the design system
// - generators: Configuration data for the generators
export async function masterGenerator(masterParams: MasterGeneratorParams): Promise<void> {
  if (!masterParams.generators || !Object.keys(masterParams.generators).length) {
    return Promise.reject(new Error('No generators selected.'));
  }

  await Promise.all(
    Object.entries(masterParams.generators)
      .filter(([, generatorValue]) => !!generatorValue)
      .map(([name]) => {
        const { generators: generatorParams, ...commonParams } = masterParams;
        const userParams = generatorParams[name as keyof typeof masterParams.generators];
        const generator = generators[`${name}Generator` as keyof typeof generators];

        const resolvedParams = {
          ...userParams,
          ...(userParams?.buildPath
            ? { buildPath: userParams.buildPath }
            : commonParams?.buildPath
              ? { buildPath: commonParams.buildPath + `/${generatorConfigs[name].dir}` }
              : {}),
          ...(generatorConfigs[name].commonParams.includes('prefix')
            ? (userParams && 'prefix' in userParams ? userParams.prefix : undefined) ||
              commonParams?.prefix
              ? {
                  prefix:
                    (userParams && 'prefix' in userParams ? userParams.prefix : undefined) ||
                    commonParams?.prefix
                }
              : {}
            : {}),
          ...(generatorConfigs[name].commonParams.includes('baseFontSize')
            ? (userParams && 'baseFontSize' in userParams ? userParams.baseFontSize : undefined) ||
              commonParams?.baseFontSize
              ? {
                  baseFontSize:
                    (userParams && 'baseFontSize' in userParams
                      ? userParams.baseFontSize
                      : undefined) || commonParams?.baseFontSize
                }
              : {}
            : {})
        };

        return (generator as (params: typeof resolvedParams) => unknown)(resolvedParams);
      })
  );
}
