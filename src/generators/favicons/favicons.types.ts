/* =================================================== */
/* FAVICONS → TYPES */
/* =================================================== */

import type { FaviconOptions } from 'favicons';
import type { EnforceRequired } from '../../types/utils.types.js';

//
// ---------------------------------------------------
// CONFIG

// For more information on the favicons configuration,
// see the following link: https://www.npmjs.com/package/favicons
export type FaviconsGeneratorParams = {
  id: string;
  sourcePath: string;
  buildPath?: string;
} & EnforceRequired<
  Omit<FaviconOptions, 'path'>,
  'appName' | 'appShortName' | 'appDescription' | 'version'
>;
