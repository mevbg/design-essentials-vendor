/* =================================================== */
/* ICONS */
/* =================================================== */

import type { ServiceFunction } from '../../types/index.js';
import { cssService } from '../../utils/services.utils.js';
import { outputIcons } from './icons.parser.js';
import type { IconsConfig } from './icons.types.js';

//
// ---------------------------------------------------
// SERVICE

// This function generates the CSS essentials, the design tokens
// and returns the StyleDictionary instance
export const iconsService: ServiceFunction<IconsConfig> = (params) =>
  cssService<IconsConfig>(params, outputIcons);
