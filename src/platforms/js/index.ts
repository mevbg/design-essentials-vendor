import { JsCustomPlatformFileType, PlatformContextGetter } from '../../types/index.js';

// This is the platform context getter for the JS platform.
// It returns the platform context that brings the following info:
// • two custom files (static and variable) should be created;
// • no other files should be created.
export const js: PlatformContextGetter = ({ prefix, designConfig }) => ({
  config: {
    options: {
      prefix,
      designConfig
    }
  },
  customFiles: Object.values(JsCustomPlatformFileType)
});
