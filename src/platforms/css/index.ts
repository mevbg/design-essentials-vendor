import { CssCustomPlatformFileType, PlatformContextGetter } from '../../types/index.js';

// This is the platform context getter for the CSS platform.
// It returns the platform context that brings the following info:
// • a file with all tokens should be created;
// • a file for each token type should be created
// • a custom file for the root font size should be created.
export const css: PlatformContextGetter = ({ prefix, designConfig }) => ({
  config: {
    prefix,
    options: {
      prefix,
      designConfig
    }
  },
  allTokensFile: true,
  tokenTypeFiles: true,
  customFiles: [
    CssCustomPlatformFileType.ROOT_FONT_SIZE,
    ...(designConfig.fonts ? [CssCustomPlatformFileType.FONT_FACES] : []),
    ...(designConfig.iconography ? [CssCustomPlatformFileType.ICONOGRAPHY] : []),
    ...(designConfig.scrollbar ? [CssCustomPlatformFileType.SCROLLBAR] : [])
  ]
});
