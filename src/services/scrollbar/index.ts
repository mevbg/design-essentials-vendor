/* =================================================== */
/* SCROLLBAR */
/* =================================================== */

import type { ServiceFunction } from '../../types/index.js';
import { cssService } from '../../utils/services.utils.js';
import { outputScrollbar } from './scrollbar.parser.js';
import type { ScrollbarConfig } from './scrollbar.types.js';

//
// ---------------------------------------------------
// SERVICE

// This function generates the CSS essentials, the design tokens
// and returns the StyleDictionary instance
export const scrollbarService: ServiceFunction<ScrollbarConfig> = (params) =>
  cssService<ScrollbarConfig>(params, outputScrollbar);
