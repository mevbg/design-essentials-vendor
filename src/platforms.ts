import path from 'path';
import { PlatformConfig, TransformedToken } from 'style-dictionary/types';
import { CORE_TOKENS } from './constants.js';
import {
  PlatformConfigProvider,
  PlatformConfigsBuilderParams,
  PlatformName
} from './types/index.js';
import { CoreToken } from './types/tokens.types.js';
import { getDestinationFileName, getFormatterName } from './utils/formats.utils.js';
import { toKebabCase } from './utils/strings.utils.js';

export const getPlatformConfigs = async (
  platforms: PlatformName[],
  params: PlatformConfigsBuilderParams
): Promise<Partial<Record<PlatformName, PlatformConfig>>> => {
  const imports: Promise<Record<PlatformName, PlatformConfigProvider>>[] = platforms.map(
    (platformName) => import(`./platforms/${platformName}/index.js`)
  );
  const arrOfBuilders = await Promise.all(imports);

  const platformConfigs = Object.fromEntries(
    arrOfBuilders.map((builder, index) => {
      const platform = platforms[index];
      const { config, files = [], coreFiles } = builder[platform](params);

      return [
        platform,
        {
          transformGroup: platform,
          buildPath: `${path.resolve(params.buildPath)}/${platform}`,
          files: [
            ...files.map((file) => ({
              destination: getDestinationFileName(platform, file),
              format: getFormatterName(platform, file)
            })),
            ...(coreFiles
              ? CORE_TOKENS.map((key) => ({
                  destination: getDestinationFileName(platform, toKebabCase(key)),
                  format: getFormatterName(platform, 'core'),
                  filter: (token: TransformedToken) => token.$type === key
                }))
              : []),
            ...(coreFiles
              ? [
                  {
                    destination: getDestinationFileName(platform, 'others'),
                    format: getFormatterName(platform, 'others'),
                    filter: (token: TransformedToken) =>
                      !CORE_TOKENS.includes(token.$type as CoreToken)
                  }
                ]
              : [])
          ],
          ...config
        }
      ];
    })
  );

  return platformConfigs;
};
