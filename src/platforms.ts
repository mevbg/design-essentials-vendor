import path from 'path';
import { PlatformConfig, TransformedToken } from 'style-dictionary/types';
import { DesignData } from './types/generator.types.js';
import {
  CommonPlatformFileType,
  CustomFormatterCategory,
  PlatformConfigProvider,
  PlatformFilename,
  PlatformType
} from './types/index.js';
import { CoreToken } from './types/tokens.types.js';
import { getDestinationFileName, getFormatterName } from './utils/formats.utils.js';
import { toKebabCase } from './utils/strings.utils.js';

export const getPlatformConfigs = async ({
  platforms,
  buildPath,
  designData,
  prefix
}: {
  platforms: PlatformType[];
  buildPath: string;
  designData: DesignData;
  prefix: string;
}): Promise<Partial<Record<PlatformType, PlatformConfig>>> => {
  const providersImports: Promise<Record<PlatformType, PlatformConfigProvider>>[] = platforms.map(
    (platformType) => import(`./platforms/${platformType}/index.js`)
  );
  const platformConfigProviders = await Promise.all(providersImports);

  const platformConfigs = Object.fromEntries(
    platformConfigProviders.map((item, index) => {
      const platformType = platforms[index];
      const provider = item[platformType];
      const formatterCategory = Object.values(CustomFormatterCategory).find(
        (category) => (category as string) === (platformType as string)
      ) as CustomFormatterCategory;
      const {
        config,
        customFiles = [],
        allTokensFile,
        tokenTypeFiles
      } = provider({
        designData,
        prefix
      });

      return [
        platformType,
        {
          transformGroup: platformType,
          buildPath: `${path.resolve(buildPath)}/${platformType}`,
          files: [
            // if allTokensFile is true, a file with all tokens should be created
            ...(allTokensFile
              ? [
                  {
                    destination: getDestinationFileName(platformType, CommonPlatformFileType.ALL),
                    format: getFormatterName(formatterCategory, CommonPlatformFileType.ALL)
                  }
                ]
              : []),

            // if tokenTypeFiles is true, a file for each token type should be created
            ...(tokenTypeFiles
              ? Object.values(CoreToken).map((key) => ({
                  destination: getDestinationFileName(
                    platformType,
                    toKebabCase(key) as PlatformFilename
                  ),
                  format: getFormatterName(formatterCategory, CommonPlatformFileType.CORE),
                  filter: (token: TransformedToken) => token.$type === key
                }))
              : []),

            // if tokenTypeFiles is true, a file for "others" (if such, not in the core list) should be created
            ...(tokenTypeFiles
              ? [
                  {
                    destination: getDestinationFileName(
                      platformType,
                      CommonPlatformFileType.OTHERS
                    ),
                    format: getFormatterName(formatterCategory, CommonPlatformFileType.OTHERS),
                    filter: (token: TransformedToken) =>
                      !Object.values(CoreToken).includes(token.$type as CoreToken)
                  }
                ]
              : []),

            // if customFiles is provided, a file for each one of them should be created
            ...customFiles.map((file) => ({
              destination: getDestinationFileName(platformType, file as PlatformFilename),
              format: getFormatterName(formatterCategory, file)
            }))
          ],
          ...config
        }
      ];
    })
  );

  return platformConfigs;
};
