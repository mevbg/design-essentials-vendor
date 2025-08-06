import StyleDictionary from 'style-dictionary';

import * as defaults from '../defaults.js';
import { customFormatterTemplate, getFormatterName } from './formats.utils.js';
import { toKebabCase } from './strings.utils.js';

export const cssGenerator = <GeneratorParams>(
  name: string,
  params: GeneratorParams,
  outputGenerator: (output: string[], config: GeneratorParams) => string
) => {
  const defaultParams = defaults[`${name}GeneratorDefaultParams` as keyof typeof defaults];
  const config = {
    ...defaultParams,
    ...params
  } as Required<GeneratorParams & { buildPath: string }>;

  StyleDictionary.registerFormat(
    customFormatterTemplate<GeneratorParams>({
      name,
      config,
      outputGenerator
    })
  );

  // Define the StyleDictionary instance
  const dictionary = new StyleDictionary({
    tokens: {
      type: {
        variant: { $value: '' }
      }
    },
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: config.buildPath,
        files: [
          {
            destination: `${toKebabCase(name)}.css`,
            format: getFormatterName(name)
          }
        ]
      }
    }
  });

  // Generate the output
  return dictionary.buildAllPlatforms();
};
