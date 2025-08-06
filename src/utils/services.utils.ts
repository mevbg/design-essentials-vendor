import path from 'path';
import StyleDictionary from 'style-dictionary';
import { FormatFnArguments } from 'style-dictionary/types';

import { ServiceParams } from '../types/services.types.js';
import { customFormatterTemplate, getFormatterName } from './formats.utils.js';
import { toKebabCase } from './strings.utils.js';

export const cssService = <T>(
  name: string,
  params: ServiceParams<T>,
  outputGenerator: (
    output: string[],
    params: ServiceParams<T>,
    formatArgs?: FormatFnArguments
  ) => string
) => {
  StyleDictionary.registerFormat(
    customFormatterTemplate<T>({
      name,
      outputGenerator,
      params
    })
  );

  // Define the StyleDictionary instance
  const dictionary = new StyleDictionary({
    ...(name === 'fontFaces' && params.tokensPath
      ? {
          source: [path.resolve(params.tokensPath)]
        }
      : {
          tokens: {
            type: {
              variant: { $value: '' }
            }
          }
        }),
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
