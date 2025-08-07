/* =================================================== */
/* MASTER → GENERATOR */
/* =================================================== */

import { masterGeneratorDefaultParams } from '../../defaults.js';
import { GeneratorFn } from '../../types/index.js';
import * as generators from '../index.js';
import type { MasterGeneratorParams } from './master.types.js';

//
// ---------------------------------------------------
// PROXY CONFIG

const proxyConfig: Record<
  string,
  {
    masterCoreParams: Array<
      keyof Pick<MasterGeneratorParams, 'buildPath' | 'prefix' | 'baseFontSize'>
    >;
    dir: string;
  }
> = {
  favicons: { masterCoreParams: ['buildPath'], dir: 'favicons' },
  fontFaces: { masterCoreParams: ['buildPath'], dir: 'css' },
  icons: { masterCoreParams: ['buildPath'], dir: 'css' },
  scrollbar: { masterCoreParams: ['buildPath'], dir: 'css' },
  viewportScaler: { masterCoreParams: ['buildPath', 'prefix', 'baseFontSize'], dir: 'css' },
  tokens: { masterCoreParams: ['buildPath', 'prefix', 'baseFontSize'], dir: 'tokens' }
};

//
// ---------------------------------------------------
// GENERATOR FUNCTION

// This is the main exposed function that initializes the design essentials generation process.
// It takes all configuration parameters:
// - buildPath: Path to the directory where the generated output files will be created
// - prefix: Prefix that will be used when creating CSS custom properties
// - baseFontSize: Base font size for the design system
// - generators: Configuration data for the generators
export const masterGenerator: GeneratorFn<MasterGeneratorParams, void> = async (masterParams) => {
  if (!masterParams.generators || !Object.keys(masterParams.generators).length) {
    return Promise.reject(new Error('No generators selected.'));
  }

  await Promise.all(
    Object.entries(masterParams.generators)
      .filter(([, generatorValue]) => !!generatorValue)
      .map(([name]) => {
        const { generators: generatorParams, ...masterCoreParams } = masterParams;
        const userParams = generatorParams[name as keyof typeof masterParams.generators];
        const generator = generators[`${name}Generator` as keyof typeof generators];

        const resolvedParams = {
          ...masterGeneratorDefaultParams,
          ...userParams,
          ...(userParams?.buildPath
            ? { buildPath: userParams.buildPath }
            : masterCoreParams?.buildPath
              ? { buildPath: masterCoreParams.buildPath + `/${proxyConfig[name].dir}` }
              : {
                  buildPath: masterGeneratorDefaultParams.buildPath + `/${proxyConfig[name].dir}`
                }),
          ...(proxyConfig[name].masterCoreParams.includes('prefix')
            ? (userParams && 'prefix' in userParams ? userParams.prefix : undefined) ||
              masterCoreParams?.prefix
              ? {
                  prefix:
                    (userParams && 'prefix' in userParams ? userParams.prefix : undefined) ||
                    masterCoreParams?.prefix
                }
              : {
                  prefix: masterGeneratorDefaultParams.prefix
                }
            : {}),
          ...(proxyConfig[name].masterCoreParams.includes('baseFontSize')
            ? (userParams && 'baseFontSize' in userParams ? userParams.baseFontSize : undefined) ||
              masterCoreParams?.baseFontSize
              ? {
                  baseFontSize:
                    (userParams && 'baseFontSize' in userParams
                      ? userParams.baseFontSize
                      : undefined) || masterCoreParams?.baseFontSize
                }
              : {
                  baseFontSize: masterGeneratorDefaultParams.baseFontSize
                }
            : {})
        };

        return (generator as (params: typeof resolvedParams) => unknown)(resolvedParams);
      })
  );
};
