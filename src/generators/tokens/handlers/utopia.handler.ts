/* =================================================== */
/* TOKENS → HANDLERS → UTOPIA */
/* =================================================== */

import { tab } from '../../../utils/formats.utils.js';
import {
  CommonHandlerParams,
  CustomFormatterCategory,
  JsCustomFormatterType
} from '../types/format.types.js';
import { getFileOutput } from '../utils/formats.utils.js';
import {
  mapUtopiaTokenValuesToMax,
  mapUtopiaTokenValuesToMin,
  mapUtopiaTokenValuesToResponsive,
  separateUtopiaAndBasicTokens
} from '../utils/utopia-tokens.utils.js';

//
// ---------------------------------------------------
// HANDLER FUNCTION

// Renders Utopia tokens based on a given context
export const utopiaHandler = async ({
  name,
  category,
  type,
  formatArgs,
  tokens,
  config
}: CommonHandlerParams): Promise<string> =>
  getFileOutput({
    name,
    category,
    config,
    parser: (output, wrapper, definer) => {
      // Get the options from the format arguments
      const { options } = formatArgs;

      // Separate Utopia and basic tokens
      const { utopiaTokens, basicTokens } = separateUtopiaAndBasicTokens(tokens);
      const { utopiaScheme, baseFontSize } = options?.designData || {};
      const { minViewportW, maxViewportW } = utopiaScheme;
      const separation =
        [CustomFormatterCategory.CSS, CustomFormatterCategory.SCSS].includes(category) ||
        type === JsCustomFormatterType.STATIC;

      if (separation) {
        const tokens = {
          Min: {
            tokens: mapUtopiaTokenValuesToMin(utopiaTokens),
            media: `(max-width: ${minViewportW - 1}px)`
          },
          Utopia: {
            tokens: mapUtopiaTokenValuesToResponsive(utopiaTokens, baseFontSize, utopiaScheme),
            media: `(min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px)`
          },
          Max: {
            tokens: mapUtopiaTokenValuesToMax(utopiaTokens),
            media: `(min-width: ${maxViewportW + 1}px)`
          }
        };

        const variants = Object.entries(tokens).map(([key, value]) => ({
          suffix: key,
          tokens: value.tokens,
          media: value.media
        }));

        variants.forEach(({ suffix, tokens, media }, index) => {
          const separator = category === CustomFormatterCategory.JS ? ' ' : '-';
          const extraNewline = index < variants.length - 1 || basicTokens.length;

          if (category === CustomFormatterCategory.CSS && media) {
            output.push(`@media all and ${media} {`);
          }
          output.push(
            wrapper({
              name:
                category !== CustomFormatterCategory.CSS
                  ? name +
                    separator +
                    (category === CustomFormatterCategory.JS ? suffix : suffix.toLowerCase())
                  : undefined,
              code: definer({
                type,
                tokens,
                indent: category === CustomFormatterCategory.CSS ? tab(2) : undefined
              }),
              indent: category === CustomFormatterCategory.CSS ? tab(1) : undefined
            }) + (extraNewline && category !== CustomFormatterCategory.CSS ? '\n' : '')
          );
          if (category === CustomFormatterCategory.CSS && media) {
            output.push(`}${extraNewline ? '\n' : ''}`);
          }
        });
      }

      // Print out basic tokens (if no separation, print out all the tokens as basic)
      const restTokens = separation ? basicTokens : tokens;
      if (restTokens.length) {
        output.push(
          wrapper({
            name: category !== CustomFormatterCategory.CSS ? name : undefined,
            code: definer({ type, tokens: restTokens, options })
          })
        );
      }
    }
  });
