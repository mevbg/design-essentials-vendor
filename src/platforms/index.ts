import { PlatformConfig } from 'style-dictionary/types';
import { PlatformConfigBuilder, PlatformConfigBuilderParams, PlatformName } from '../types';
import { css } from './css.platform';
import { js } from './js.platform';
import { json } from './json.platform';
import { scss } from './scss.platform';

const platformBuilders: Record<PlatformName, PlatformConfigBuilder> = {
  css,
  js,
  json,
  scss
};

export const getPlatformConfigs = (
  platforms: PlatformName[],
  params: PlatformConfigBuilderParams
): Partial<Record<PlatformName, PlatformConfig>> => {
  const platformConfigs = Object.fromEntries(
    platforms.map((platformName) => [platformName, platformBuilders[platformName](params)])
  );

  return platformConfigs;
};
