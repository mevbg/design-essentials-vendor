/* =================================================== */
/* FONT FACES */
/* =================================================== */

import type { ServiceFunction } from '../../types/index.js';
import { cssService } from '../../utils/services.utils.js';
import { outputFontFaces } from './font-faces.parser.js';
import type { FontFacesConfig } from './font-faces.types.js';

//
// ---------------------------------------------------
// SERVICE

// This function generates the CSS essentials, the design tokens
// and returns the StyleDictionary instance
export const fontFacesService: ServiceFunction<FontFacesConfig> = (params) =>
  cssService<FontFacesConfig>(params, outputFontFaces);
