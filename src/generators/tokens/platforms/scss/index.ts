/* =================================================== */
/* TOKENS → PLATFORMS → SCSS */
/* =================================================== */

import type { PlatformContextGetter } from '../../tokens.types.js';

// This is the platform context getter for the SCSS platform.
// It returns the platform context that brings the following info:
// • a file with all tokens should be created;
// • a file for each token type should be created;
export const scss: PlatformContextGetter = ({ designData }) => ({
  config: {
    options: { designData }
  },
  allTokensFile: true,
  tokenTypeFiles: true
});
