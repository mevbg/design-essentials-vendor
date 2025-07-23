import { DEFAULT_FLUID_SCALE_MAX_VIEWPORT, DEFAULT_FLUID_SCALE_MIN_VIEWPORT } from '../constants';

export type FluidScaleSchemeConfig = {
  minViewportW: number;
  maxViewportW: number;
};

export const defaultFluidScaleSchemeConfig: FluidScaleSchemeConfig = {
  minViewportW: DEFAULT_FLUID_SCALE_MIN_VIEWPORT,
  maxViewportW: DEFAULT_FLUID_SCALE_MAX_VIEWPORT
};
