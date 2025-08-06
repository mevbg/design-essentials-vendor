import { GeneratorCommonParams } from '../../types/generator.types.js';
import * as generators from '../index.js';
import { MasterGeneratorParams } from './master.types.js';

console.log(generators);

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

export const proxyGenerator = (name: string, masterParams: MasterGeneratorParams) => {
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
      ? userParams?.prefix || commonParams?.prefix
        ? { prefix: userParams.prefix || commonParams.prefix }
        : {}
      : {}),
    ...(generatorConfigs[name].commonParams.includes('baseFontSize')
      ? userParams?.baseFontSize || commonParams?.baseFontSize
        ? { baseFontSize: userParams.baseFontSize || commonParams.baseFontSize }
        : {}
      : {})
  };

  console.log('proxyGenerator', name, { resolvedParams });
  // console.log(generators);
};
