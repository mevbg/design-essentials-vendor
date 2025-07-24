import { PlatformConfig } from 'style-dictionary/types';
import { PlatformConfigBuilder, PlatformConfigBuilderParams, PlatformName } from '../types';

export const getPlatformConfigs = async (
  platforms: PlatformName[],
  params: PlatformConfigBuilderParams
): Promise<Partial<Record<PlatformName, PlatformConfig>>> => {
  const imports: Promise<Record<PlatformName, PlatformConfigBuilder>>[] = platforms.map(
    (platformName) => import(`./${platformName}.platform`)
  );
  const arrOfBuilders = await Promise.all(imports);

  const platformConfigs = Object.fromEntries(
    arrOfBuilders.map((builder, index) => [platforms[index], builder[platforms[index]](params)])
  );

  return platformConfigs;
};
