import path from 'path';
import { PlatformConfig, TransformedToken } from 'style-dictionary/types';
import { DesignConfig } from './types/design.types.js';
import {
  CommonPlatformFileType,
  CustomFormatterCategory,
  PlatformContextGetter,
  PlatformFilename,
  PlatformType
} from './types/index.js';
import { CoreToken } from './types/tokens.types.js';
import { getDestinationFileName, getFormatterName } from './utils/formats.utils.js';
import { toKebabCase } from './utils/strings.utils.js';

// getPlatformConfigs is a function that is responsible
// for preparing the configurations for the Style Dictionary platforms object.
// It iterates through the provided list of platform names,
// dynamically imports the platform context getters for each given platform type,
// runs them and returns the platform configs based on the context received.
export const getPlatformConfigs = async ({
  platforms,
  buildPath,
  designConfig,
  prefix
}: {
  platforms: PlatformType[];
  buildPath: string;
  designConfig: DesignConfig;
  prefix: string;
}): Promise<Partial<Record<PlatformType, PlatformConfig>>> => {
  // Dynamically import the platform context getters for each given platform type
  const platformContextImports: Promise<Record<PlatformType, PlatformContextGetter>>[] =
    platforms.map((platformType) => import(`./platforms/${platformType}/index.js`));
  const platformContextGetters = await Promise.all(platformContextImports);

  // Return "platforms" object with the configs,
  // by iterating over the platform context getters,
  // preparing the platform configs with the received context
  // and returning them as a key-value pair [PlatformType, PlatformConfig]
  // which is then converted to an object with the PlatformType as the key
  // and the PlatformConfig as the value.
  return Object.fromEntries(
    platformContextGetters.map((item, index) => {
      // Get the platform type
      const platformType = platforms[index];

      // Get the PlatformContextGetter function for the given platform type
      const getPlatformContext = item[platformType];

      // Get the platform context
      const {
        config,
        customFiles = [],
        allTokensFile,
        tokenTypeFiles
      } = getPlatformContext({
        designConfig,
        prefix
      });

      // It is necessary to define the formatter category (based on the platform type),
      // because the getFormatterName function expects CustomFormatterCategory as the first argument
      // and the platform type is not a valid CustomFormatterCategory.
      const formatterCategory = Object.values(CustomFormatterCategory).find(
        (category) => (category as string) === (platformType as string)
      ) as CustomFormatterCategory;

      // Prepare the platform config with the received context
      const platformConfig: PlatformConfig = {
        transformGroup: platformType,
        buildPath: `${path.resolve(buildPath)}`,
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
                  destination: getDestinationFileName(platformType, CommonPlatformFileType.OTHERS),
                  format: getFormatterName(formatterCategory, CommonPlatformFileType.OTHERS),
                  filter: (token: TransformedToken) =>
                    !Object.values(CoreToken).includes(token.$type as CoreToken)
                }
              ]
            : []),

          // if customFiles is provided, a file for each one of them should be created
          ...customFiles.map((file) => ({
            destination: getDestinationFileName(
              platformType,
              file as PlatformFilename,
              platformType === 'css' ? '' : undefined // keeps custom CSS files outside "tokens" directory
            ),
            format: getFormatterName(formatterCategory, file)
          }))
        ],

        // Spread the specific platform config (if any)
        ...config
      };

      return [platformType, platformConfig];
    })
  );
};
