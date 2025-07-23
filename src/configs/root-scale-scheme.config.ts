import { DEFAULT_ROOT_SCALE_MAX_VIEWPORT, DEFAULT_ROOT_SCALE_MIN_VIEWPORT } from '../constants';

export type RootScaleSchemeConfig = {
  minViewportW: number;
  maxViewportW: number;
};

export const defaultRootScaleSchemeConfig: RootScaleSchemeConfig = {
  minViewportW: DEFAULT_ROOT_SCALE_MIN_VIEWPORT,
  maxViewportW: DEFAULT_ROOT_SCALE_MAX_VIEWPORT
};
