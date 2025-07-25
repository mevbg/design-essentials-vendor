import { ColorSchemeMethod, ColorSchemeType } from '../../src/types/scheme.types.js';

export { BASE_FONT_SIZE } from './design/constants/typography.constants';

export const PREFIX: string = 'dev';

export const DEFAULT_COLOR_SCHEME: ColorSchemeType = ColorSchemeType.LIGHT;
export const COLOR_SCHEME_METHOD: ColorSchemeMethod = ColorSchemeMethod.COMBINED;

export const FLUID_SCALE_MIN_VIEWPORT: number = 600;
export const FLUID_SCALE_MAX_VIEWPORT: number = 1200;

export const ROOT_SCALE_MIN_VIEWPORT: number = 300;
export const ROOT_SCALE_MAX_VIEWPORT: number = 2100;

export const PLATFORMS = ['css', 'scss', 'js', 'json'];
