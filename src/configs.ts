import {
  DEFAULT_COLOR_SCHEME,
  DEFAULT_COLOR_SCHEME_METHOD,
  DEFAULT_FLUID_SCALE_MAX_VIEWPORT,
  DEFAULT_FLUID_SCALE_MIN_VIEWPORT,
  DEFAULT_ROOT_SCALE_MAX_VIEWPORT,
  DEFAULT_ROOT_SCALE_MIN_VIEWPORT
} from './constants.js';
import {
  ColorSchemeConfig,
  ColorSchemeMethod,
  ColorSchemeType,
  FluidScaleSchemeConfig,
  RootScaleSchemeConfig
} from './types/scheme.types.js';

// Color scheme config
export const defaultColorSchemeConfig: ColorSchemeConfig = {
  default: DEFAULT_COLOR_SCHEME as ColorSchemeType,
  method: DEFAULT_COLOR_SCHEME_METHOD as ColorSchemeMethod
};

// Fluid scale scheme config
export const defaultFluidScaleSchemeConfig: FluidScaleSchemeConfig = {
  minViewportW: DEFAULT_FLUID_SCALE_MIN_VIEWPORT,
  maxViewportW: DEFAULT_FLUID_SCALE_MAX_VIEWPORT
};

// Root scale scheme config
export const defaultRootScaleSchemeConfig: RootScaleSchemeConfig = {
  minViewportW: DEFAULT_ROOT_SCALE_MIN_VIEWPORT,
  maxViewportW: DEFAULT_ROOT_SCALE_MAX_VIEWPORT
};
