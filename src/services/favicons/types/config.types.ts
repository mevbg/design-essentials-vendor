import type { FaviconOptions } from 'favicons';
import type { EnforceRequired } from '../../../types/utils.types.js';

//
// ------------------------------------------------------------
// FAVICONS

// For more information on the favicons configuration,
// see the following link: https://www.npmjs.com/package/favicons
export type FaviconsConfig = {
  id: string;
  sourcePath: string;
  outputPath?: string;
} & EnforceRequired<
  Omit<FaviconOptions, 'path'>,
  'appName' | 'appShortName' | 'appDescription' | 'version'
>;
