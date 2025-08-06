import StyleDictionary from 'style-dictionary';

import { GeneratorParams } from '../types/generator.types.js';
import { customFormatterTemplate, getFormatterName } from './formats.utils.js';
import { toKebabCase } from './strings.utils.js';

export const cssService = <T>(
  name: string,
  params: GeneratorParams<T>,
  outputGenerator: (output: string[]) => string
) => {
  StyleDictionary.registerFormat(
    customFormatterTemplate<T>({
      name,
      params,
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
        buildPath: params.buildPath + '/css',
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
